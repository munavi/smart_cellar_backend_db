const { ProfileController } = require('../../src/controllers/profileController');
const { Profile, Country } = require('../../src/models/models');
const { ApiError } = require('../../src/error/ApiError');

jest.mock('../../src/models/models');

describe('ProfileController', () => {
    let req, res, next;

    beforeEach(() => {
        // Initialize mock request, response, and next function
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock function calls after each test
    });

    describe('create', () => {
        it('should create a profile and return it', async () => {
            // Mocking the request body
            req.body = {
                firstname: 'John',
                lastname: 'Doe',
                countryId: 1,
                currencyId: 2,
            };

            // Mocking the Profile.create method to return the created profile
            Profile.create.mockResolvedValue(req.body);

            // Call the method and check the response
            await ProfileController.create(req, res, next);

            expect(Profile.create).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('should handle errors and call the next function', async () => {
            // Mocking the request body
            req.body = {
                firstname: 'John',
                lastname: 'Doe',
                countryId: 1,
                currencyId: 2,
            };

            // Mocking an error from Profile.create
            const errorMessage = 'Some error occurred';
            Profile.create.mockRejectedValue(new Error(errorMessage));

            // Call the method and check if the next function is called with the ApiError
            await ProfileController.create(req, res, next);

            expect(Profile.create).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith(ApiError.badRequest(errorMessage));
        });
    });

    describe('getAll', () => {
        // TODO: Write unit tests for the getAll method
        // Similar to the create method, you need to mock the Profile.findAndCountAll method
        // and test its behavior with different inputs and error scenarios.
    });

    describe('getOne', () => {
        // TODO: Write unit tests for the getOne method
        // Similar to the previous methods, you need to mock the Profile.findOne method
        // and test its behavior with different inputs and error scenarios.
    });

    describe('removeOne', () => {
        // TODO: Write unit tests for the removeOne method
        // Similar to the previous methods, you need to mock the Profile.destroy method
        // and test its behavior with different inputs and error scenarios.
    });

    describe('updateOne', () => {
        // TODO: Write unit tests for the updateOne method
        // Similar to the previous methods, you need to mock the Profile.update method
        // and test its behavior with different inputs and error scenarios.
    });
});
