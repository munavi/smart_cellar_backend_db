const { Country } = require('./../models/models');
const {Currency} = require("../models/models");

async function seedCountries() {
    try {
        const countriesToAdd = [
            {
                name: 'Germany',
            },
            {
                name: 'USA',
            },
            {
                name: 'China',
            },
            {
                name: 'Ukraine',
            },
            {
                name: 'Kazakhstan',
            }
        ];

        const createdCountry = await Country.bulkCreate(countriesToAdd);
        console.log('The Countries table has been successfully populated with data.');
        return createdCountry;
    } catch (error) {
        console.error('Error filling the Countries table:', error);
    }
}

module.exports = seedCountries;