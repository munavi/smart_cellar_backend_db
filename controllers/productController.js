const {Product, User, Profile} = require('../models/models')
const {ApiError} = require('../error/ApiError')
const sequelize = require("sequelize");

class ProductController {
    async create(req, res, next){
        try {
            const {name, quantity, date, categoryId, storageLocationId, userId}  = req.body
            const product = await Product.create({name, quantity, date, categoryId, storageLocationId, userId})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getProductsByUserId(req, res, next) {
        try {
            const { userId } = req.params;

            const products = await Product.findAll({
                attributes: [
                    'id',
                    'name',
                    'quantity',
                    'categoryId',
                    'storageLocationId',
                    [sequelize.literal(`to_char(Product.date, 'DD-MM-YY')`), 'date'],
                    ],
                where: {userId : userId},
            });

            return res.json(products);
        } catch (error) {
            console.error('Error fetching products by userId:', error);
            next(ApiError.badRequest('Error fetching products by userId'));
        }
    }


    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;

            await Product.update(body, {
                where: { id: id },
                // returning: true,
            });
            const updatedProduct = await Product.findByPk(id);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            next(ApiError.badRequest('Error updating product'));
        }
    }

    async removeOne(req, res){
        const {id} = req.params
        const product = await Product.destroy({where:{id}})
        return res.json(product)
    }
}

module.exports = new ProductController()