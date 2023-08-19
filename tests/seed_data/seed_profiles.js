const {Profile, User, Country, Currency} = require("../../src/models/models");
const faker = require('faker');
const logger = require('../../logger');

async function seedProfiles(createdUsers, createdCountries, createdCurrencies) {
    try {
        const profilesToAdd = [];
        function getRandomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        for (const user of createdUsers) {
            const randomCountry = getRandomItem(createdCountries);
            const randomCurrency = getRandomItem(createdCurrencies);

            const profile = {
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                userId: user.id,
                countryId: randomCountry.id,
                currencyId: randomCurrency.id,
            };

            profilesToAdd.push(profile);
        }

        await Profile.bulkCreate(profilesToAdd);
        logger.info('The Profiles table has been successfully populated with data.');
    } catch (error) {
        logger.error('Error filling the Profiles table:', error);
        throw error;
    }
}

module.exports = seedProfiles;