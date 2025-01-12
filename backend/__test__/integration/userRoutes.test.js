jest.mock("../../dbConnect"); // Replace `dbConnect` with the mock version
process.env.JWT_KEY = 'mock-jwt-secret';  // Define a consistent JWT secret key

const request = require("supertest");
const app = require('../../app');
const { Sequelize } = require("../../dbConnect");
const models = require("../../models");
const { user, loginUser, resetUser, userScore } = require('../db.data');
const { createToken } = require("../../middleware/auth");

let testUserId = 1;
let forgotPWEmail = 'test2@user.com';
let registerEmail = 'test3@user.com';

beforeAll(async () => {
    await Sequelize.sync({ force: true });

    // insert test data
    const testUser = await models.User.create(user);
    testUserId = testUser.id;
    await testUser.createScore(userScore);

    await models.User.create({...user, email: forgotPWEmail});
});
  
afterAll(async () => {

    // clean up database
    await models.User.truncate(); 
    await models.Scores.truncate(); 
    await Sequelize.close();
});

// list of routes
const userRoutes = [
    { method: 'POST', path: `/api/users/login`, description: 'login existing  user', resultMsg: 'User successfully logged in', body: loginUser, dataType: 'object' },
    { method: 'POST', path: `/api/users/register`, description: 'register new user', resultMsg: 'User successfully registered', body: {...user, email: registerEmail}, dataType: 'object' },
    { method: 'POST', path: `/api/users/forgotpw`, description: 'generate password reset code', resultMsg: 'Reset code sent successfully', body: {...loginUser, email: forgotPWEmail}, dataType: 'object' },
    { method: 'POST', path: `/api/users/resetpw`, description: 'reset user password', resultMsg: 'Password updated successfully', body: resetUser, dataType: 'object' },
    { method: 'PUT', path: `/api/users/${testUserId}`, description: 'update user data', resultMsg: 'User updated successfully', body: user, dataType: 'object', auth: true },
    { method: 'GET', path: `/api/users/${testUserId}/scores`, description: 'get user challenge scores', resultMsg: 'User scores fetched successfully', dataType: 'array' },
    { method: 'GET', path: `/api/users/leaderboard`, description: 'get all user scores', resultMsg: 'Top scores fetched successfully', dataType: 'array' },
    { method: 'POST', path: `/api/users/${testUserId}/answer`, description: 'save user challenge score', resultMsg: 'User scores updated successfully', body: userScore, dataType: 'object' },
    { method: 'DELETE', path: `/api/users/${testUserId}`, description: 'delete user', resultMsg: 'User deleted successfully', dataType: 'object', auth: true },
]

describe("User Routes", () => {

    // test each route, checking content type, response code, and body
    for (let route of userRoutes) {

        test(`${route.method} ${route.path} => ${route.description}`, async () => {
            const req = request(app)[route.method.toLowerCase()](route.path) // dynamically call the right HTTP method

            // If method is POST or PUT, include the body
            if (route.method === 'POST' || route.method === 'PUT') req.send(route.body); 

            // if this request requires authentication, send a token
            if (route.auth) {
                const token = createToken(1, 'test@user.com');
                req.set('x-access-token', token);
            }
                     
            await req.expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    // check the `result` property
                    expect(response.body).toMatchObject({
                        result: route.resultMsg
                    });

                    // check that `data` is of the right type and has data
                    if (route.dataType === 'array') {
                        expect(Array.isArray(response.body.data)).toBe(true);
                        expect(response.body.data.length).toBeGreaterThan(0);
                    } else if (route.dataType === 'object') {
                        expect(typeof response.body.data).toBe('object');
                        expect(Object.keys(response.body.data).length).toBeGreaterThan(0);
                    }
                });            
        });
    }

});