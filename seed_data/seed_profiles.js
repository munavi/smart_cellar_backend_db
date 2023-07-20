const { Profile } = require('./../models/models');
const {User, Country, Currency} = require("../models/models");
const seedCountries = require("./seed_countries");
const seedCurrencies = require("./seed_currencies");
const seedUsers = require("./seed_users");

async function seedProfiles() {
    try {

        const createdUsers = await seedUsers()
        const createdCountries = await seedCountries()
        const createdCurrencies = await seedCurrencies()

        const profilesToAdd = [
            {
                firstname: 'John',
                lastname: 'Smith',
                userId: createdUsers[0].id,
                countryId: createdCountries[0].id,
                currencyId: createdCurrencies[0].id,
            },
            {
                firstname: 'Emily',
                lastname: 'Johnson',
                userId: createdUsers[1].id,
                countryId: createdCountries[1].id,
                currencyId: createdCurrencies[1].id,

            }
        ];

        await Profile.bulkCreate(profilesToAdd);
        console.log('The Profiles table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Profiles table:', error);
    }
}

module.exports = seedProfiles;