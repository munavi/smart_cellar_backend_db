const ProfileController = require('../../src/controllers/profileController');
const { Profile, Country, User, Currency, } = require('../../src/models/models');
const  ApiError  = require('../../src/error/ApiError');

jest.mock('../../src/models/models', () => ({
    Profile: {
        create: jest.fn(),
        getAll: jest.fn(),
        getOne: jest.fn(),
        removeOne: jest.fn(),
        updateOne: jest.fn(),
    },
    Country: {
        findByPk: jest.fn(),
    },
    User: {
        findByPk: jest.fn(),
    },
    Currency: {
        findByPk: jest.fn(),
    },
}));
// Mocking the response and next functions
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('ProfileController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new profile', async () => {
            const req = {
                body: {
                    firstname: 'John',
                    lastname: 'Doe',
                    userId: 1,
                    countryId: 2,
                    currencyId: 3,
                },
            };
            const createdProfile = {
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                userId: 1,
                countryId: 2,
                currencyId: 3,
            };
            // Mock the create method of Profile model
            Profile.create.mockResolvedValueOnce(createdProfile);
            // Profile.reload.mockResolvedValueOnce(createdProfile);

            await ProfileController.create(req, res, next);

            expect(Profile.create).toHaveBeenCalledWith({
                firstname: 'John',
                lastname: 'Doe',
                userId: 1,
                countryId: 2,
                currencyId: 3,
            });
            expect(res.json).toHaveBeenCalledWith(createdProfile);
        });

    //     it('should handle errors when creating a profile', async () => {
    //         const req = { body: { firstname: 'John', lastname: 'Doe', countryId: 1, currencyId: 1 } };
    //         const res = { json: jest.fn() };
    //         const next = jest.fn();
    //
    //         // Mock the create method of Profile model to throw an error
    //         Profile.create.mockRejectedValue(new Error('Mocked error'));
    //
    //         await ProfileController.create(req, res, next);
    //
    //         expect(Profile.create).toHaveBeenCalledWith({
    //             firstname: 'John',
    //             lastname: 'Doe',
    //             countryId: 1,
    //             currencyId: 1,
    //         });
    //         expect(next).toHaveBeenCalledWith(ApiError.internal('Could not create the profile.'));
    //     });
    // });
    //
    // describe('getAll', () => {
    //     it('should fetch all profiles', async () => {
    //         const req = { query: { currencyId: 1, countryId: 2, limit: 20, page: 1 } };
    //         const res = { json: jest.fn() };
    //
    //         // Mock the findAndCountAll method of Profile model
    //         Profile.findAndCountAll.mockResolvedValue({
    //             count: 2,
    //             rows: [
    //                 { id: 1, firstname: 'John', lastname: 'Doe', countryId: 2, currencyId: 1 },
    //                 { id: 2, firstname: 'Jane', lastname: 'Smith', countryId: 2, currencyId: 1 },
    //             ],
    //         });
    //
    //         await ProfileController.getAll(req, res, {});
    //
    //         expect(Profile.findAndCountAll).toHaveBeenCalledWith({
    //             where: { currencyId: 1, countryId: 2 },
    //             limit: 20,
    //             offset: 0,
    //         });
    //         expect(res.json).toHaveBeenCalledWith({
    //             count: 2,
    //             rows: [
    //                 { id: 1, firstname: 'John', lastname: 'Doe', countryId: 2, currencyId: 1 },
    //                 { id: 2, firstname: 'Jane', lastname: 'Smith', countryId: 2, currencyId: 1 },
    //             ],
    //         });
    //     });
    //
    //     it('should handle errors when fetching all profiles', async () => {
    //         const req = { query: { currencyId: 1, countryId: 2, limit: 20, page: 1 } };
    //         const res = { json: jest.fn() };
    //         const next = jest.fn();
    //
    //         // Mock the findAndCountAll method of Profile model to throw an error
    //         Profile.findAndCountAll.mockRejectedValue(new Error('Mocked error'));
    //
    //         await ProfileController.getAll(req, res, next);
    //
    //         expect(Profile.findAndCountAll).toHaveBeenCalledWith({
    //             where: { currencyId: 1, countryId: 2 },
    //             limit: 20,
    //             offset: 0,
    //         });
    //         expect(next).toHaveBeenCalledWith(ApiError.internal('Could not fetch the list of profiles.'));
    //     });
    // });
    //
    // describe('getOne', () => {
    //     it('should fetch a single profile by id', async () => {
    //         const req = { params: { id: 1 } };
    //         const res = { json: jest.fn() };
    //
    //         // Mock the findOne method of Profile model
    //         Profile.findOne.mockResolvedValue({ id: 1, firstname: 'John', lastname: 'Doe', countryId: 2, currencyId: 1 });
    //
    //         await ProfileController.getOne(req, res, {});
    //
    //         expect(Profile.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
    //         expect(res.json).toHaveBeenCalledWith({ id: 1, firstname: 'John', lastname: 'Doe', countryId: 2, currencyId: 1 });
    //     });
    //
    //     it('should handle errors when fetching a single profile by id', async () => {
    //         const req = { params: { id: 1 } };
    //         const res = { json: jest.fn() };
    //         const next = jest.fn();
    //
    //         // Mock the findOne method of Profile model to throw an error
    //         Profile.findOne.mockRejectedValue(new Error('Mocked error'));
    //
    //         await ProfileController.getOne(req, res, next);
    //
    //         expect(Profile.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
    //         expect(next).toHaveBeenCalledWith(ApiError.internal('Could not fetch the Profile with id=1'));
    //     });
    // });
    //
    // describe('removeOne', () => {
    //     it('should remove a profile with valid id', async () => {
    //         const req = { params: { id: 1 } };
    //         const res = { json: jest.fn() };
    //
    //         // Mock the destroy method of Profile model
    //         Profile.destroy.mockResolvedValue(1);
    //
    //         await ProfileController.removeOne(req, res, {});
    //
    //         expect(Profile.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    //         expect(res.json).toHaveBeenCalledWith({ message: 'Profile was deleted successfully!' });
    //     });
    //
    //     it('should handle non-existing profile id during removal', async () => {
    //         const req = { params: { id: 999 } };
    //         const res = { json: jest.fn() };
    //
    //         // Mock the destroy method of Profile model with 0 rows affected
    //         Profile.destroy.mockResolvedValue(0);
    //
    //         await ProfileController.removeOne(req, res, {});
    //
    //         expect(Profile.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
    //         expect(res.json).toHaveBeenCalledWith({
    //             message: 'Cannot delete Profile with id=999. Maybe Profile was not found!',
    //         });
    //     });
    //
    //     it('should handle errors when removing a profile', async () => {
    //         const req = { params: { id: 1 } };
    //         const res = { json: jest.fn() };
    //         const next = jest.fn();
    //
    //         // Mock the destroy method of Profile model to throw an error
    //         Profile.destroy.mockRejectedValue(new Error('Mocked error'));
    //
    //         await ProfileController.removeOne(req, res, next);
    //
    //         expect(Profile.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    //         expect(next).toHaveBeenCalledWith(ApiError.internal('Could not delete Profile with id=1'));
    //     });
    // });
    //
    // describe('updateOne', () => {
    //     it('should update a profile with valid id and return updated profile', async () => {
    //         const req = { params: { id: 1 }, body: { firstname: 'UpdatedFirstName' } };
    //         const res = { json: jest.fn() };
    //
    //         // Mock the update method of Profile model
    //         Profile.update.mockResolvedValue([1, [{ id: 1, firstname: 'UpdatedFirstName' }]]);
    //
    //         await ProfileController.updateOne(req, res, {});
    //
    //         expect(Profile.update).toHaveBeenCalledWith({ firstname: 'UpdatedFirstName' }, {
    //             where: { id: 1 },
    //             returning: true,
    //         });
    //         expect(res.json).toHaveBeenCalledWith({ id: 1, firstname: 'UpdatedFirstName' });
    //     });
    //
    //     it('should handle non-existing profile id during update', async () => {
    //         const req = { params: { id: 999 }, body: { firstname: 'UpdatedFirstName' } };
    //         const res = { json: jest.fn() };
    //
    //         // Mock the update method of Profile model with 0 rows affected
    //         Profile.update.mockResolvedValue([0, []]);
    //
    //         await ProfileController.updateOne(req, res, {});
    //
    //         expect(Profile.update).toHaveBeenCalledWith({ firstname: 'UpdatedFirstName' }, {
    //             where: { id: 999 },
    //             returning: true,
    //         });
    //         expect(res.status).toHaveBeenCalledWith(404);
    //         expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
    //     });
    //
    //     it('should handle errors when updating a profile', async () => {
    //         const req = { params: { id: 1 }, body: { firstname: 'UpdatedFirstName' } };
    //         const res = { json: jest.fn() };
    //         const next = jest.fn();
    //
    //         // Mock the update method of Profile model to throw an error
    //         Profile.update.mockRejectedValue(new Error('Mocked error'));
    //
    //         await ProfileController.updateOne(req, res, next);
    //
    //         expect(Profile.update).toHaveBeenCalledWith({ firstname: 'UpdatedFirstName' }, {
    //             where: { id: 1 },
    //             returning: true,
    //         });
    //         expect(next).toHaveBeenCalledWith(ApiError.internal('Could not update the profile with id=1'));
    //     });
    });
});
