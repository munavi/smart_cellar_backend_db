const { Category, Country} = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const candidate = await Category.findOne({ where: { name } });
            if (candidate) {
                throw ApiError.badRequest('Category with this name already exists');
            }
            const category = await Category.create({ name });
            return res.json(category);
        } catch (error) {
            return next(ApiError.internal('Could not create the category.'));
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            return next(ApiError.internal('Could not fetch the list of categories.'));
        }
    }

    async removeCategory(req, res, next) {
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
