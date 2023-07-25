const {Profile, User, Country, Currency} = require("../../src/models/models");
const faker = require('faker');
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
        console.log('The Profiles table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Profiles table:', error);
        throw error;
    }
}

module.exports = seedProfiles;