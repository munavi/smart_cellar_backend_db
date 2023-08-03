const { Currency } = require('../../src/models/models');
const CurrencyController = require('../../src/controllers/currencyController');
const ApiError = require('../../src/error/ApiError');

// Mock the Currency model and its methods
jest.mock('../../src/models/models');

describe('CurrencyController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new currency', async () => {
            const req = { body: { name: 'Test Currency' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the create method of Currency model
            Currency.create.mockResolvedValue({ id: 1, name: 'Test Currency' });

            await CurrencyController.create(req, res);

            expect(Currency.create).toHaveBeenCalledWith({ name: 'Test Currency' });
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Currency' });
        });

        it('should handle errors when creating a currency', async () => {
            const req = { body: { name: 'Test Currency' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the create method of Currency model to throw an error
            Currency.create.mockRejectedValue(new Error('Mocked error'));

            await CurrencyController.create(req, res, next);

            expect(Currency.create).toHaveBeenCalledWith({ name: 'Test Currency' });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not create the currency.'));
        });
    });

    describe('getAll', () => {
        it('should fetch all currencies', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the findAll method of Currency model
            Currency.findAll.mockResolvedValue([{ id: 1, name: 'Currency 1' }, { id: 2, name: 'Currency 2' }]);

            await CurrencyController.getAll({}, res);

            expect(Currency.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, name: 'Currency 1' },
                { id: 2, name: 'Currency 2' },
            ]);
        });

        it('should handle errors when fetching all currencies', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the findAll method of Currency model to throw an error
            Currency.findAll.mockRejectedValue(new Error('Mocked error'));

            await CurrencyController.getAll({}, res, next);

            expect(Currency.findAll).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not fetch the list of currencies.'));
        });
    });

    describe('removeOne', () => {
        it('should remove a currency with valid id', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of Currency model
            Currency.destroy.mockResolvedValue(1);

            await CurrencyController.removeOne(req, res);

            expect(Currency.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Currency was deleted successfully!' });
        });

        it('should handle non-existing currency id during removal', async () => {
            const req = { params: { id: 999 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of Currency model with 0 rows affected
            Currency.destroy.mockResolvedValue(0);

            await CurrencyController.removeOne(req, res);

            expect(Currency.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Cannot delete Currency with id=999. Maybe Currency was not found!' });
        });

        it('should handle errors when removing a currency', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the destroy method of Currency model to throw an error
            Currency.destroy.mockRejectedValue(new Error('Mocked error'));

            await CurrencyController.removeOne(req, res, next);

            expect(Currency.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not delete Currency with id=1'));
        });
    });
});
