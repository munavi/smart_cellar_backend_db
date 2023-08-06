const {Profile, Country, User, Currency, Product} = require('../models/models')
const ApiError = require('../error/ApiError');

class ProfileController {
    async create(req, res, next){
        try {
            const {firstname, lastname, userId, countryId, currencyId}  = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const country = await Country.findByPk(countryId);
            if (!country) {
                return res.status(404).json({ error: 'Country not found' });
            }
            const currency = await Currency.findByPk(currencyId);
            if (!currency) {
                return res.status(404).json({ error: 'Currency not found' });
            }
            const profile = await Profile.create({firstname, lastname, userId, countryId, currencyId})
            await profile.reload();
            return res.json(profile)
        } catch (error) {
            next(ApiError.internal('Error creating profile'));
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
        } catch (error) {
            next(ApiError.internal('Could not fetch the list of profiles.'));
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        try {
            const profile = await Profile.findOne({where: {Id: id}});
            return res.json(profile);
        } catch (error) {
            next(ApiError.internal(`Could not fetch the Profile with id=${req.params.id}`));
        }
    }

    async removeOne(req, res, next) {
        const { id } = req.params;
        try {
            const deletedProfile = await Profile.findByPk(id);
            if (!deletedProfile) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            const ret = await Profile.destroy({ where: { Id: id} });
            if(ret === 1){
                return res.status(200).json({ message: 'Profile was deleted successfully!'});
            }
            return res.json(ret);
        } catch (error) {
            next(ApiError.internal(`Could not delete Profile with id=${req.params.id}`));
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
            } catch (error) {
                next(ApiError.internal(`Could not update the profile with id=${req.params.id}`));
            }
        }
    }

module.exports = new ProfileController();