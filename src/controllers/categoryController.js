const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res){
        const{name} = req.body
        const category = await Category.create({name})
        return res.json(category)

    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async removeOne(req, res){
        const {id} = req.params
        Category.destroy({
            where: {id},
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "Category was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Category with id=" + id
                });
            });
    };
}

module.exports = new CategoryController()