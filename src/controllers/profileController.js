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


    async getAll(req, res, next) {
        try {
            const { currencyId, countryId, limit = 20, page = 1 } = req.query;
            const offset = (page - 1) * limit;
            const whereOptions = {};

            if (currencyId) {
                whereOptions.currencyId = currencyId;
            }
            if (countryId) {
                whereOptions.countryId = countryId;
            }

            const profiles = await Profile.findAndCountAll({ where: whereOptions, limit, offset });
            return res.json(profiles);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        try {
            const profile = await Profile.findOne({where: {userId: id}});
            return res.json(profile);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeOne(req, res, next) {
        const { id } = req.params;
        try {
            const profile = await Profile.destroy({ where: { id } });
            return res.json(profile);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

        async updateOne(req, res, next) {
            const { id } = req.params;
            const { body } = req;

            try {
                const [, [updatedProfile]] = await Profile.update(body, {
                    where: { id },
                    returning: true,
                });

                if (!updatedProfile) {
                    return res.status(404).json({ error: 'Profile not found' });
                }

                return res.json(updatedProfile);
            } catch (e) {
                next(ApiError.badRequest(e.message));
            }
        }
    }

module.exports = new ProfileController();