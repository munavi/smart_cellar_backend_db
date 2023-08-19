const { Currency } = require('../../src/models/models');
const logger = require('../../logger')

async function seedCurrencies() {
    try {
        const currenciesToAdd = [
            {
                name: 'EUR',
            },
            {
                name: 'USD',
            },
            {
                name: 'CHY',
            },
            {
                name: 'UAH',
            },
            {
                name: 'KZT',
            }
        ];

        const createdCurrencies = await Currency.bulkCreate(currenciesToAdd);
        logger.info('The Currencies table has been successfully populated with data.');
        return createdCurrencies;
    } catch (error) {
        logger.error('Error filling the Currencies table:', error);
    }
}

module.exports = seedCurrencies;