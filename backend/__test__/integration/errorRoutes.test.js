jest.mock("../../dbConnect"); // Replace `dbConnect` with the mock version
process.env.JWT_KEY = 'mock-jwt-secret';  // Define a consistent JWT secret key

const request = require("supertest");
const app = require('../../app');
const { Sequelize } = require("../../dbConnect");
const models = require("../../models");
const { error } = require('../db.data');
const { createToken } = require("../../middleware/auth");

beforeAll(async () => {
    await Sequelize.sync({ force: true });
});
  
afterAll(async () => {
    await Sequelize.close();
});

// list of routes
const errorRoutes = [
    { method: 'GET', path: '/api/errorLog', description: 'list errors', resultMsg: 'Error logs fetched successfully', dataType: 'array', auth: true },
    { method: 'POST', path: '/api/errorLog', description: 'add new error', resultMsg: 'Error added to log successfully', body: error, dataType: 'object' },
]

describe("Error Routes", () => {

    beforeEach(async () => {
        // insert test data
        await models.ErrorLog.create(error);
    });

    afterEach(async () => {
        // clean up database
        await models.ErrorLog.truncate();
    });

    // test each route, checking content type, response code, and body
    for (let route of errorRoutes) {

        test(`${route.method} ${route.path} => ${route.description}`, async () => {
            const req = request(app)[route.method.toLowerCase()](route.path) // dynamically call the right HTTP method

            // If method is POST, include the body
            if (route.method === 'POST') req.send(route.body); 

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