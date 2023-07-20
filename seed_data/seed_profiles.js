const {Profile, User, Country, Currency} = require("../models/models");

async function seedProfiles(createdUsers, createdCountries, createdCurrencies) {
    try {

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