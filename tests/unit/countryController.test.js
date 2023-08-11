const { Country } = require('../../src/models/models');
const CountryController = require('../../src/controllers/countryController');
const ApiError = require('../../src/error/ApiError');

// Mock the Country model and its methods
jest.mock('../../src/models/models');

describe('CountryController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createCountry', () => {
        it('should create a new country', async () => {
            const req = { body: { name: 'Test Country' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the create method of Country model
            Country.create.mockResolvedValue({ id: 1, name: 'Test Country' });

            await CountryController.createCountry(req, res);

            expect(Country.create).toHaveBeenCalledWith({ name: 'Test Country' });
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Country' });
        });

        it('should handle errors when creating a country', async () => {
            const req = { body: { name: 'Test Country' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the create method of Country model to throw an error
            Country.create.mockRejectedValue(new Error('Mocked error'));

            await CountryController.createCountry(req, res, next);

            expect(Country.create).toHaveBeenCalledWith({ name: 'Test Country' });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not create the country.'));
        });
    });

    describe('getAllCountries', () => {
        it('should fetch all countries', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the findAll method of Country model
            Country.findAll.mockResolvedValue([{ id: 1, name: 'Country 1' }, { id: 2, name: 'Country 2' }]);

            await CountryController.getAllCountries({}, res);

            expect(Country.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, name: 'Country 1' },
                { id: 2, name: 'Country 2' },
            ]);
        });

        it('should handle errors when fetching all countries', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the findAll method of Country model to throw an error
            Country.findAll.mockRejectedValue(new Error('Mocked error'));

            await CountryController.getAllCountries({}, res, next);

            expect(Country.findAll).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not fetch the list of countries.'));
        });
    });

    describe('removeCountry', () => {
        it('should remove a country with valid id', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of Country model
            Country.destroy.mockResolvedValue(1);

            await CountryController.removeCountry(req, res);

            expect(Country.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Country was deleted successfully!' });
        });

        it('should handle non-existing country id during removal', async () => {
            const req = { params: { id: 999 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of Country model with 0 rows affected
            Country.destroy.mockResolvedValue(0);

            await CountryController.removeCountry(req, res);

            expect(Country.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Cannot delete Country with id=999. Maybe Country was not found!' });
        });

        it('should handle errors when removing a country', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the destroy method of Country model to throw an error
            Country.destroy.mockRejectedValue(new Error('Mocked error'));

            await CountryController.removeCountry(req, res, next);

            expect(Country.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not delete Country with id= 1'));
        });
    });
});
