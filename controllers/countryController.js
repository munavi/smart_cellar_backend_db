const {Country} = require('../models/models')
const ApiError = require('../error/ApiError')

class CountryController {
    async create(req, res){
        const{name} = req.body
        const country = await Country.create({name})
        return res.json(country)

    }

    async getAll(req, res){
        const countries = await Country.findAll()
        return res.json(countries)
    }

    async removeOne(req, res){
        const {id} = req.params
        Country.destroy({
            where: {id},
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "Country was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Country with id=${id}. Maybe Country was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Country with id=" + id
                });
            });
    };
}

module.exports = new CountryController()