const { Product, User, Profile, Category, StorageLocation} = require('../models/models');
const { ApiError } = require('../error/ApiError');

const productSortOptions = [
    ['date', 'ASC'],
    ['name', 'ASC'],
    ['quantity', 'ASC'],
    ['categoryId', 'ASC'],
    ['storageLocationId', 'ASC'],
];

class ProductController {
    async createProduct(req, res, next) {
        try {
            const { name, quantity, date, categoryId, storageLocationId, userId } = req.body;

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            const storageLocation = await StorageLocation.findByPk(storageLocationId);
            if (!storageLocation) {
                return res.status(404).json({ error: 'Storage Location not found' });
            }

            const product = await Product.create({ name, quantity, date, categoryId, storageLocationId, userId });
            await product.reload();
            return res.json(product);
        } catch (error) {
            next(ApiError.badRequest('Error creating product'));
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

    async getCountProducts(req, res, next) {
        try {
            const { userId } = req.params;

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const productStat = {
                countAllCategories: 0,
                countAllStorageLocations: 0,
                countAllProducts: 0,
                dataByCategory: [],
                dataByLocation: [],
            };
            productStat.countAllCategories = await Category.count();
            productStat.countAllStorageLocations = await StorageLocation.count();
            productStat.countAllProducts = await Product.count({ where: { userId: userId } });

            const categories = await Category.findAll();
            for (const category of categories) {
                const countProducts = await Product.count({where: {userId: userId, categoryId: category.id}});
                productStat.dataByCategory.push ({
                    id: category.id,
                    name: category.name,
                    countProducts: countProducts,
                });
            }

            const storageLocations = await StorageLocation.findAll();
            for (const storageLocation of storageLocations) {
                const countProducts = await Product.count({where: {userId: userId, storageLocationId: storageLocation.id}});
                productStat.dataByLocation.push ({
                    id: storageLocation.id,
                    name: storageLocation.name,
                    countProducts: countProducts,
                });
            }

            return res.json(productStat);
        } catch (error) {
            next(ApiError.badRequest('Error fetching product count'));
        }
    }

    async updateProduct(req, res, next) {
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

    async removeProduct(req, res, next) {
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
