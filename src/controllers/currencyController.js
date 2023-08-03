const { Currency } = require('../models/models');
const ApiError = require('../error/ApiError');

class CurrencyController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const currency = await Currency.create({ name });
            return res.json(currency);
        } catch (error) {
            return next(ApiError.internal('Could not create the currency.'));
        }
    }

    async getAll(req, res, next) {
        try {
            const currencies = await Currency.findAll();
            return res.json(currencies);
        } catch (error) {
            return next(ApiError.internal('Could not fetch the list of currencies.'));
        }
    }

    async removeOne(req, res, next) {
        try {
            const { id } = req.params;
            const numDeleted = await Currency.destroy({ where: { id } });
            if (numDeleted === 1) {
                return res.json({ message: 'Currency was deleted successfully!' });
            } else {
                return res.json({ message: `Cannot delete Currency with id=${id}. Maybe Currency was not found!` });
            }
        } catch (error) {
            return next(ApiError.internal(`Could not delete Currency with id=${req.params.id}`));
        }
    }
}

module.exports = new CurrencyController();
