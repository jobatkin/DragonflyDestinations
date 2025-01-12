jest.mock("../../dbConnect"); // Replace `dbConnect` with the mock version
process.env.JWT_KEY = 'mock-jwt-secret';  // Define a consistent JWT secret key

const request = require("supertest");
const app = require('../../app');
const { Sequelize } = require("../../dbConnect");
const models = require("../../models");
const { submission } = require('../db.data');
const { createToken } = require("../../middleware/auth");

const formName = 'contact'; 
let testSubmissionId = 1;

beforeAll(async () => {
    await Sequelize.sync({ force: true });

    const testSubmission = await models.Submission.create(submission);
    testSubmissionId = testSubmission.id;    
});
  
afterAll(async () => {
    await models.Submission.truncate();
    await Sequelize.close();
});

// list of routes
const submissionRoutes = [
    { method: 'GET', path: `/api/submissions/${formName}`, description: 'list form submissions', resultMsg: `Submissions for form ${formName} fetched successfully`, dataType: 'array' },
    { method: 'POST', path: '/api/submissions', description: 'add new form submission', resultMsg: 'Submission added successfully', body: submission, dataType: 'object' },
    { method: 'PUT', path: `/api/submissions/${testSubmissionId}`, description: 'update submission', resultMsg: 'Submission updated successfully', body: submission, dataType: 'object', auth: true },
    { method: 'DELETE', path: `/api/submissions/${testSubmissionId}`, description: 'delete submission', resultMsg: 'Submission deleted successfully', dataType: 'object', auth: true },
]

describe("Submission Routes", () => {

    // test each route, checking content type, response code, and body
    for (let route of submissionRoutes) {

        test(`${route.method} ${route.path} => ${route.description}`, async () => {
            const req = request(app)[route.method.toLowerCase()](route.path) // dynamically call the right HTTP method

            // If method is POST, include the body
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