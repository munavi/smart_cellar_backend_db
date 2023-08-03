const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            return res.json(category);
        } catch (error) {
            return next(ApiError.internal('Could not create the category.'));
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            return next(ApiError.internal('Could not fetch the list of categories.'));
        }
    }

    async removeOne(req, res, next) {
        try {
            const { id } = req.params;
            const numDeleted = await Category.destroy({ where: { id } });
            if (numDeleted === 1) {
                return res.json({ message: 'Category was deleted successfully!' });
            } else {
                return res.json({ message: `Cannot delete Category with id=${id}. Maybe Category was not found!` });
            }
        } catch (error) {
            return next(ApiError.internal(`Could not delete Category with id=${req.params.id}`));
        }
    }
}

module.exports = new CategoryController();
