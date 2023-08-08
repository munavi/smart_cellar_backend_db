const { Country } = require('../../src/models/models');
const logger = require("../../logger");

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
        logger.info('The Countries table has been successfully populated with data.');
        return createdCountry;
    } catch (e) {
        logger.error('Error filling the Countries table:', e);
    }
}

module.exports = seedCountries;