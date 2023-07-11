const {StorageLocation} = require("../models/models");

class StorageLocationController {
    async create(req, res){
        const{name} = req.body
        const storageLocation = await StorageLocation.create({name})
        return res.json(storageLocation)

    }

    async getAll(req, res){
        const storageLocations = await StorageLocation.findAll()
        return res.json(storageLocations)
    }

    async removeOne(req, res){

    }

}

module.exports = new StorageLocationController()