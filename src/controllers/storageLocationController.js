const { StorageLocation, Currency} = require('../models/models');
const ApiError = require('../error/ApiError');

class StorageLocationController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const candidate = await StorageLocation.findOne({ where: { name } });
            if (candidate) {
                throw ApiError.badRequest('StorageLocation with this name already exists');
            }
            const storageLocation = await StorageLocation.create({ name });
            return res.json(storageLocation);
        } catch (error) {
            return next(ApiError.internal('Could not create the storage location.'));
        }
    }

    async getAll(req, res, next) {
        try {
            const storageLocations = await StorageLocation.findAll();
            return res.json(storageLocations);
        } catch (error) {
            return next(ApiError.internal('Could not fetch the list of storage locations.'));
        }
    }

    async removeOne(req, res, next) {
        try {
            const { id } = req.params;
            const numDeleted = await StorageLocation.destroy({ where: { id } });
            if (numDeleted === 1) {
                return res.json({ message: 'Storage location was deleted successfully!' });
            } else {
                return res.json({ message: `Cannot delete Storage location with id=${id}. Maybe Storage location was not found!` });
            }
        } catch (error) {
            return next(ApiError.internal(`Could not delete Storage location with id=${req.params.id}`));
        }
    }
}

module.exports = new StorageLocationController();
