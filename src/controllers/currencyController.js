const {Currency} = require('../models/models')
const ApiError = require('../error/ApiError')

class CurrencyController {
    async create(req, res){
        const{name} = req.body
        const currency = await Currency.create({name})
        return res.json(currency)

    }

    async getAll(req, res){
        const currencies = await Currency.findAll()
        return res.json(currencies)
    }

    async removeOne(req, res){
        const {id} = req.params
        Currency.destroy({
            where: {id},
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "Currency was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Currency with id=${id}. Maybe Currency was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Currency with id=" + id
                });
            });
    };
}

module.exports = new CurrencyController()