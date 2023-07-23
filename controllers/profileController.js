const uuid = require('uuid')
const {Profile, Country} = require('../models/models')
const {ApiError} = require('../error/ApiError')

class ProfileController {
    async create(req, res, next){
        try {
            const {firstname, lastname, countryId, currencyId}  = req.body
            const profile = await Profile.create({firstname, lastname, countryId, currencyId})

            return res.json(profile)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {currencyId, countryId, limit, page} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let profiles;
        if (!currencyId && !countryId) {
            profiles = await Profile.findAndCountAll({limit, offset})
        }
        if (currencyId && !countryId) {
            profiles = await Profile.findAndCountAll({where:{currencyId}, limit, offset})
        }
        if (!currencyId && countryId) {
            profiles = await Profile.findAndCountAll({where:{countryId}, limit, offset})
        }
        if (currencyId && countryId) {
            profiles = await Profile.findAndCountAll({where:{countryId, currencyId}, limit, offset})
        }
        return res.json(profiles)
    }

    async getOne(req, res){
        const {id} = req.params
        // const profile = await Profile.findByPk(id, {include:[{model: Country, right: true}]})
        const profile = await Profile.findOne({
            where: {userId : id},
        });
        return res.json(profile)
    }

    async removeOne(req, res){
        const {id} = req.params
        const profile = await Profile.destroy({where:{id}})
        return res.json(profile)
    }

    async updateOne(req, res){
        const { id } = req.params;
        const { body } = req;

        try {
            await Profile.update(body, {
                where: { userId: id },
                // returning: true,
            });

            const updatedProfile = await Profile.findOne({
                where: {userId : id},
            });

            if (!updatedProfile) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            return res.json(updatedProfile);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to update profile' });
        }

    }
}

module.exports = new ProfileController()