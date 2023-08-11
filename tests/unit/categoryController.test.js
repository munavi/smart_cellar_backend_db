const { Category } = require('../../src/models/models');
const CategoryController = require('../../src/controllers/categoryController');
const ApiError = require('../../src/error/ApiError');

// Mock the Category model and its methods
jest.mock('../../src/models/models');


describe('CategoryController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new category', async () => {
            const req = { body: { name: 'Test Category' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the create method of Category model
            Category.create.mockResolvedValue({ id: 1, name: 'Test Category' });

            await CategoryController.create(req, res);

            expect(Category.create).toHaveBeenCalledWith({ name: 'Test Category' });
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Category' });
        });

        it('should handle errors when creating a category', async () => {
            const req = { body: { name: 'Test Category' } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the create method of Category model to throw an error
            Category.create.mockRejectedValue(new Error('Mocked error'));

            await CategoryController.create(req, res, next);

            expect(Category.create).toHaveBeenCalledWith({ name: 'Test Category' });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not create the category.'));
        });
    });

    describe('getAll', () => {
        it('should fetch all categories', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the findAll method of Category model
            Category.findAll.mockResolvedValue([{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]);

            await CategoryController.getAll({}, res);

            expect(Category.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, name: 'Category 1' },
                { id: 2, name: 'Category 2' },
            ]);
        });

        it('should handle errors when fetching all categories', async () => {
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the findAll method of Category model to throw an error
            Category.findAll.mockRejectedValue(new Error('Mocked error'));

            await CategoryController.getAll({}, res, next);

            expect(Category.findAll).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not fetch the list of categories.'));
        });
    });

    describe('removeOne', () => {
        it('should remove a category with valid id', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of Category model
            Category.destroy.mockResolvedValue(1);

            await CategoryController.removeOne(req, res);

            expect(Category.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Category was deleted successfully!' });
        });

        it('should handle non-existing category id during removal', async () => {
            const req = { params: { id: 999 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };

            // Mock the destroy method of Category model with 0 rows affected
            Category.destroy.mockResolvedValue(0);

            await CategoryController.removeOne(req, res);

            expect(Category.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
            expect(res.json).toHaveBeenCalledWith({ message: 'Cannot delete Category with id=999. Maybe Category was not found!' });
        });

        it('should handle errors when removing a category', async () => {
            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            // Mock the destroy method of Category model to throw an error
            Category.destroy.mockRejectedValue(new Error('Mocked error'));

            await CategoryController.removeOne(req, res, next);

            expect(Category.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(next).toHaveBeenCalledWith(ApiError.internal('Could not delete Category with id=1'));
        });
    });
});
