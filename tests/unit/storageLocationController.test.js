const { StorageLocation } = require('../../src/models/models');
const StorageLocationController = require('../../src/controllers/storageLocationController');
const ApiError = require('../../src/error/ApiError');

// Mock the StorageLocation model and its methods
jest.mock('../../src/models/models');

describe('StorageLocationController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new storage location', async () => {
            const req = { body: { name: 'Test Location' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the create method of StorageLocation model
            StorageLocation.create.mockResolvedValue({ id: 1, name: 'Test Location' });

            await StorageLocationController.createStorageLocation(req, res);

            expect(StorageLocation.create).toHaveBeenCalledWith({ name: 'Test Location' });
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Location' });
        });

        it('should handle errors when creating a storage location', async () => {
            const req = { body: { name: 'Test Location' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the create method of StorageLocation model to throw an error
            StorageLocation.create.mockRejectedValue(new Error('Mocked error'));

            await StorageLocationController.createStorageLocation(req, res, next);

            expect(StorageLocation.create).toHaveBeenCalledWith({ name: 'Test Location' });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not create the storage location.'));
        });
    });

    describe('getAll', () => {
        it('should fetch all storage locations', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the findAll method of StorageLocation model
            StorageLocation.findAll.mockResolvedValue([{ id: 1, name: 'Location 1' }, { id: 2, name: 'Location 2' }]);

            await StorageLocationController.getAllStorageLocations({}, res);

            expect(StorageLocation.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, name: 'Location 1' },
                { id: 2, name: 'Location 2' },
            ]);
        });

        it('should handle errors when fetching all storage locations', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the findAll method of StorageLocation model to throw an error
            StorageLocation.findAll.mockRejectedValue(new Error('Mocked error'));

            await StorageLocationController.getAllStorageLocations({}, res, next);

            expect(StorageLocation.findAll).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not fetch the list of storage locations.'));
        });
    });

    describe('removeOne', () => {
        it('should remove a storage location with a valid id', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of StorageLocation model
            StorageLocation.destroy.mockResolvedValue(1);

            await StorageLocationController.removeStorageLocation(req, res);

            expect(StorageLocation.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Storage location was deleted successfully!' });
        });

        it('should handle non-existing storage location id during removal', async () => {
            const req = { params: { id: 999 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of StorageLocation model with 0 rows affected
            StorageLocation.destroy.mockResolvedValue(0);

            await StorageLocationController.removeStorageLocation(req, res);

            expect(StorageLocation.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Cannot delete Storage location with id=999. Maybe Storage location was not found!' });
        });

        it('should handle errors when removing a storage location', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the destroy method of StorageLocation model to throw an error
            StorageLocation.destroy.mockRejectedValue(new Error('Mocked error'));

            await StorageLocationController.removeStorageLocation(req, res, next);

            expect(StorageLocation.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not delete Storage location with id=1'));
        });
    });
});
