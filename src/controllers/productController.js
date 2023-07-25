const { Product, User, Profile } = require('../models/models');
const { ApiError } = require('../error/ApiError');
const { Op } = require('sequelize');

const productSortOptions = [
    ['date', 'ASC'],
    ['name', 'ASC'],
    ['quantity', 'ASC'],
    ['categoryId', 'ASC'],
    ['storageLocationId', 'ASC'],
];

class ProductController {
    async create(req, res, next) {
        try {
            const { name, quantity, date, categoryId, storageLocationId, userId } = req.body;
            const product = await Product.create({ name, quantity, date, categoryId, storageLocationId, userId });
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getProductsByUserId(req, res, next) {
        try {
            const { userId } = req.params;

            const products = await Product.findAll({
                attributes: ['id', 'name', 'quantity', 'categoryId', 'storageLocationId', 'date'],
                where: { userId: userId },
                order: productSortOptions,
            });

            return res.json(products);
        } catch (error) {
            next(ApiError.badRequest('Error fetching products by userId'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;

            await Product.update(body, {
                where: { id: id },
            });
            const updatedProduct = await Product.findByPk(id);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(updatedProduct);
        } catch (error) {
            next(ApiError.badRequest('Error updating product'));
        }
    }

    async removeOne(req, res, next) {
        try {
            const { id } = req.params;
            const deletedProduct = await Product.findByPk(id);

            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await Product.destroy({ where: { id } });

            return res.json(deletedProduct.id);
        } catch (error) {
            next(ApiError.badRequest('Error deleting product'));
        }
    }
}

module.exports = new ProductController();
