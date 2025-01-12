jest.mock("../../dbConnect"); // Replace `dbConnect` with the mock version
process.env.JWT_KEY = 'mock-jwt-secret';  // Define a consistent JWT secret key

const request = require("supertest");
const app = require('../../app');
const { Sequelize } = require("../../dbConnect");
const models = require("../../models");
const { user, list } = require('../db.data');
const { createToken } = require("../../middleware/auth");

let testUserId = 1;
let testListId = 1;

beforeAll(async () => {
    await Sequelize.sync({ force: true });

    const testUser = await models.User.create(user);
    testUserId = testUser.id;
    const testList = await models.List.create({...list, userId: testUserId});
    testListId = testList.id;
});
  
afterAll(async () => {
    await models.User.truncate();
    await models.List.truncate();
    await Sequelize.close();
});

// list of routes
const listRoutes = [
    { method: 'GET', path: `/api/lists/${testUserId}`, description: 'get all favourite lists', resultMsg: 'Lists data for user 1 fetched successfully', dataType: 'array', auth: true },
    { method: 'POST', path: `/api/lists/${testUserId}`, description: 'add favourite list', resultMsg: 'List added successfully', body: list, dataType: 'object', auth: true },
    { method: 'PUT', path: `/api/lists/${testListId}`, description: 'update favourite list', resultMsg: 'List updated successfully', body: list, dataType: 'object', auth: true },
    { method: 'DELETE', path: `/api/lists/${testListId}`, description: 'delete favourite list', resultMsg: 'List deleted successfully', dataType: 'object', auth: true },
]

describe("List Routes", () => {

    // test each route, checking content type, response code, and body
    for (let route of listRoutes) {

        test(`${route.method} ${route.path} => ${route.description}`, async () => {
            const req = request(app)[route.method.toLowerCase()](route.path) // dynamically call the path with the right HTTP method

            // If method is POST, include the body
            if (route.method === 'POST' || route.method == 'PUT') req.send(route.body); 

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