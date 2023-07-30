const request = require('supertest');
const app = require('../../index');
const { Country } = require('../../src/models/models');
const ApiError = require('../../src/error/ApiError');
const CountryController = require('../../src/controllers/countryController');
const { Sequelize } = require('sequelize');

beforeAll(() => {
    Sequelize.options.logging = false;
});

// Create fake test data for testing
const testCountry = { name: 'Test Country' };

describe('CountryController', () => {
    beforeAll(async () => {
        // Prepare the test database before running the tests
        await Country.sync({ force: true });
    });

    it('should create a new country', async () => {
        const response = await request(app)
            .post('/api/countries')
            .send(testCountry);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', testCountry.name);
    });

    it('should get all countries', async () => {
        // Add a few countries for testing the retrieval of all countries
        await Country.bulkCreate([
            { name: 'Country 1' },
            { name: 'Country 2' },
        ]);

        const response = await request(app).get('/api/countries');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2); // Expecting two countries to be retrieved
    });

    it('should remove a country', async () => {
        // Create a test country
        const createdCountry = await Country.create(testCountry);

        const response = await request(app)
            .delete(`/api/countries/${createdCountry.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Country was deleted successfully!');
    });

    it('should return an error when removing a non-existing country', async () => {
        const response = await request(app)
            .delete('/api/countries/999999'); // Trying to delete a non-existing country

        expect(response.statusCode).toBe(200); // Assume 200 OK is returned if the country is not found
        expect(response.body).toHaveProperty('message', 'Cannot delete Country with id=999999. Maybe Country was not found!');
    });
});
