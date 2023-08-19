const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const server = require('../../index')

const request = supertest(process.env.SERVER);

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

describe('Integration Tests for Profile', () => {
    let country;
    let currency;
    let user;
    let app;
    const profile = {
        "firstname": "Max",
        "lastname": "Mustermann",
        "userId": "user.id",
        "countryId": "country.id",
        "currencyId": "currency.id"
    };


    beforeAll(async () => {
        app = await server();
        // Do any setup required for your tests
        // For example, you can set up a test database or seed data.
        // Ensure you have a separate test database to avoid interfering with the actual data.
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });

    it('should respond with 200 OK for a valid API endpoint', async () => {
        const response = await request.get('/api/country');
        expect(response.status).toBe(200);
        // Add more assertions based on the expected response for this endpoint
    });

    it('should respond with 404 Not Found for an invalid API endpoint', async () => {
        const response = await request.get('/api/non_existent_endpoint');
        expect(response.status).toBe(404);
        // Add more assertions based on the expected response for this endpoint
    });

    it('should create a new country', async () => {
        const body = {
            "name": "Bavaria"
        };
        const response = await request.post('/api/country').send(body);
        country = response.body;
        expect(response.status).toBe(200);
        expect(country).toMatchObject(body);
    });

    it('should create a new currency', async () => {
        const body = {
            "name": "Marke"
        };
        const response = await request.post('/api/currency').send(body);
        currency = response.body;
        expect(response.status).toBe(200);
        expect(currency).toMatchObject(body)
    });

    it('should create a new user', async () => {
        const body = {
            "email": "user22@user.de",
            "password": "123456",
        };
        const response = await request.post('/api/user/registration').send(body);
        expect(response.status).toBe(200);
        user = response.body;
        const token = generateJwt(response.body.id, body.email);
        expect(user.token.substring(0, 36)).toEqual(token.substring(0, 36))
    });

    it('should login a user', async () => {
        const body = {
            "email": "user22@user.de",
            "password": "123456",
        };
        const response = await request.post('/api/user/login').send(body);
        expect(response.status).toBe(200);
        user = response.body;
    });

    it('should create a new profile', async () => {
        profile.userId = user.id;
        profile.currencyId = currency.id;
        profile.countryId = country.id;
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(profile);
    });

    it('should fail to create a new profile for non-existing user', async () => {
        profile.userId = "cf9ce160-2c8a-4414-9934-269a6d833c00";
        profile.currencyId = currency.id;
        profile.countryId = country.id;
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should fail to create a new profile for non-existing currency', async () => {
        profile.userId = user.id;
        profile.currencyId = 22;
        profile.countryId = country.id;
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Currency not found');
    });

    it('should fail to create a new profile for non-existing currency', async () => {
        profile.userId = user.id;
        profile.currencyId = currency.id;
        profile.countryId = 77;
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Country not found');
    });

    it('should reject profile creation with incomplete data', async () => {
        profile.userId = "";
        profile.currencyId = "";
        profile.countryId = "";
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error creating profile');
    });


});
