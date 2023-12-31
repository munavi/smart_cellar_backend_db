const { Country, User} = require('../models/models');
const ApiError = require('../error/ApiError');

class CountryController {
    async createCountry(req, res, next) {
        try {
            const { name } = req.body;
            const candidate = await Country.findOne({ where: { name } });
            if (candidate) {
                throw ApiError.badRequest('Country with this name already exists');
            }
            const newCountry = await Country.create({ name });
            return res.json(newCountry);
        } catch (error) {
            return next(ApiError.internal('Could not create the country.'));
        }
    }

    async getAllCountries(req, res, next) {
        try {
            const countries = await Country.findAll();
            return res.json(countries);
        } catch (error) {
            return next(ApiError.internal('Could not fetch the list of countries.'));
        }
    }

    async removeCountry(req, res, next) {
        try {
            const { id } = req.params;
            const numDeleted = await Country.destroy({ where: { id } });
            if (numDeleted === 1) {
                return res.json({ message: 'Country was deleted successfully!' });
            } else {
                return res.json({ message: `Cannot delete Country with id=${id}. Maybe Country was not found!` });
            }
        } catch (error) {
            return next(ApiError.internal(`Could not delete Country with id= ${req.params.id}`));
        }
    };
}

module.exports = new CountryController();
