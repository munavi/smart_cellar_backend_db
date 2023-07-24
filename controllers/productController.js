const {Product, User} = require('../models/models')
const {ApiError} = require('../error/ApiError')

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

    // async getAll(req, res){
    //     let {categoryId, storageLocationId, limit, page} = req.query
    //     page = page || 1
    //     limit = limit || 20
    //     let offset = page * limit - limit
    //     let products;
    //     if (!categoryId && !storageLocationId) {
    //         products = await Product.findAndCountAll({limit, offset})
    //     }
    //     if (categoryId && !storageLocationId) {
    //         products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
    //     }
    //     if (!categoryId && storageLocationId) {
    //         products = await Product.findAndCountAll({where:{storageLocationId}, limit, offset})
    //     }
    //     if (categoryId && storageLocationId) {
    //         products = await Product.findAndCountAll({where:{storageLocationId, categoryId}, limit, offset})
    //     }
    //     return res.json(products)
    // }

    async getProductsByUserId(req, res, next) {
        try {
            const { userId } = req.params;

            const products = await Product.findAll({
                where: {userId : userId},
            });

            return res.json(products);
        } catch (error) {
            console.error('Error fetching products by userId:', error);
            next(ApiError.internal('Error fetching products by userId'));
        }
    }

    // async getOne(req, res){
    //     const {id} = req.params
    //     const product = await Product.findByPk(id)
    //     return res.json(product)
    // }

    async removeOne(req, res){
        const {id} = req.params
        const product = await Product.destroy({where:{id}})
        return res.json(product)
    }
}

module.exports = new ProductController()