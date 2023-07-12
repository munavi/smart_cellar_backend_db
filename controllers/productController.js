const uuid = require('uuid')
const {Product} = require('../models/models')
const {ApiError} = require('../error/ApiError')

class ProductController {
    async create(req, res, next){
        try {
            const {name, date, storageLocationId, categoryId}  = req.body
            const product = await Product.create({name, date, storageLocationId, categoryId})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {categoryId, storageLocationId, limit, page} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let products;
        if (!categoryId && !storageLocationId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (categoryId && !storageLocationId) {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if (!categoryId && storageLocationId) {
            products = await Product.findAndCountAll({where:{storageLocationId}, limit, offset})
        }
        if (categoryId && storageLocationId) {
            products = await Product.findAndCountAll({where:{storageLocationId, categoryId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res){
        const {id} = req.params
        const product = await Product.findByPk(id)
        return res.json(product)
    }

    async removeOne(req, res){
        const {id} = req.params
        const product = await Product.destroy({where:{id}})
        return res.json(product)
    }
}

module.exports = new ProductController()