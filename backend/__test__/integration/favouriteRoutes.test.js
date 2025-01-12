jest.mock("../../dbConnect"); // Replace `dbConnect` with the mock version
process.env.JWT_KEY = 'mock-jwt-secret';  // Define a consistent JWT secret key

const request = require("supertest");
const app = require('../../app');
const { Sequelize } = require("../../dbConnect");
const models = require("../../models");
const { country, flag, user, favourite } = require('../db.data');
const { createToken } = require("../../middleware/auth");

let testUserId = 1;

beforeAll(async () => {
    await Sequelize.sync({ force: true });

    // insert test data
    const testUser = await models.User.create(user);
    testUserId = testUser.id;

    await models.Country.create(country);
    await models.Flag.create(flag);
});
  
afterAll(async () => {

    // clean up database
    await models.Flag.truncate();
    await models.Country.truncate();
    await models.User.truncate();
    await models.Favourite.truncate();    

    await Sequelize.close();
});

// list of routes
const favouriteRoutes = [
    { method: 'POST', path: `/api/favourites/${testUserId}`, description: 'add new favourite for user 1', resultMsg: 'Favourite added successfully', body: favourite, dataType: 'object', auth: true },
    { method: 'GET', path: `/api/favourites/${testUserId}`, description: 'list favourites for user 1', resultMsg: 'Favourites data for user 1 fetched successfully', dataType: 'array', auth: true },
    { method: 'PUT', path: '/api/favourites/1', description: 'update favourite', resultMsg: 'Favourite updated successfully', body: favourite, dataType: 'object', auth: true },
    { method: 'DELETE', path: '/api/favourites/1', description: 'delete favourite', resultMsg: 'Favourite deleted successfully', dataType: 'object', auth: true },
]

describe("Favourite Routes", () => {

    // test each route, checking content type, response code, and body
    for (let route of favouriteRoutes) {

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