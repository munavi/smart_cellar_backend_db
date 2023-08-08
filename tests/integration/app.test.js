const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const request = supertest('http://localhost:4000');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

describe('Integration Tests', () => {
    let country;
    let currency;
    let user;
    const profile = {
        "firstname": "Max",
        "lastname": "Mustermann",
        "userId": "user.id",
        "countryId": "country.id",
        "currencyId": "currency.id"
    };

    beforeAll(async () => {
        //await start();
        // Do any setup required for your tests
        // For example, you can set up a test database or seed data.
        // Ensure you have a separate test database to avoid interfering with the actual data.
    });

    afterAll(async () => {
        //await stop();
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
        user = response.body;
        expect(response.status).toBe(200);
        expect(user.token.substring(0, 36)).toEqual(token.substring(0, 36))
    });

    it('should login a user', async () => {
        const body = {
            "email": "user22@user.de",
            "password": "123456",
        };
        body.password = await bcrypt.hash(body.password, 5);
        const response = await request.post('/api/user/login').send(body);
        expect(response.status).toBe(200);
        const token = generateJwt(response.body.id, body.email);
        user = response.body;
        expect(user.token.substring(0, 36)).toEqual(token.substring(0, 36))
    });

    it('should create a new profile', async () => {
        profile.userId = user.id;
        profile.currencyId = currency.id;
        profile.countryId = country.id;
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(profile);
    });

    it('should dont create a new profile', async () => {
        profile.userId = "cf9ce160-2c8a-4414-9934-269a6d833c00";
        profile.currencyId = currency.id;
        profile.countryId = country.id;
        const response = await request.post('/api/profile').send(profile);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });


});
