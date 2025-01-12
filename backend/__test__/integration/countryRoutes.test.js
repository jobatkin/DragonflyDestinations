jest.mock("../../dbConnect"); // Replace `dbConnect` with the mock version

const request = require("supertest");
const app = require('../../app');
const { Sequelize } = require("../../dbConnect");
const models = require("../../models");
const { country, flag, tourism } = require('../db.data');

beforeAll(async () => {
    await Sequelize.sync({ force: true });
});
  
afterAll(async () => {
    await Sequelize.close();
});

// list of routes
const countryRoutes = [
    { method: 'GET', path: '/api/countries', description: 'list countries', resultMsg: 'Country data fetched successfully', dataType: 'array' },
    { method: 'GET', path: '/api/countries/random', description: 'list random countries', resultMsg: 'Random country data fetched successfully', dataType: 'array' },
    { method: 'GET', path: `/api/countries/${country.code}`, description: 'get specific country', resultMsg: 'Country data fetched successfully', dataType: 'object' },
    { method: 'GET', path: `/api/countries/${country.code}/tourism`, description: 'get tourism info for specific country', resultMsg: 'Country tourism data fetched successfully', dataType: 'object' },
    { method: 'GET', path: `/api/countries/question?numAnswers=1`, description: 'get country question & answers', resultMsg: 'Random answers successfully generated', dataType: 'array' },
    { method: 'GET', path: `/api/countries/regions`, description: 'get country regions', resultMsg: 'Unique region data fetched successfully', dataType: 'array' },
]

describe("Country Routes", () => {

    beforeEach(async () => {
        // insert test data
        await models.Country.create(country);
        await models.Flag.create(flag);
        await models.TourismInfo.create(tourism);
    });

    afterEach(async () => {
        // clean up database
        await models.TourismInfo.truncate();
        await models.Flag.truncate();
        await models.Country.truncate();    
    });

    // test each route, checking content type, response code, and body
    for (let route of countryRoutes) {

        test(`${route.method} ${route.path} => ${route.description}`, async () => {
            await request(app)[route.method.toLowerCase()](route.path) // dynamically call the right HTTP method
                .expect("Content-Type", /json/)
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