const { Currency } = require('./../models/models');

async function seedCurrencies() {
    try {
        const currenciesToAdd = [
            {
                id: '1',
                name: 'EUR',
            },
            {
                id: '2',
                name: 'USD',
            },
            {
                id: '3',
                name: 'CHY',
            },
            {
                id: '4',
                name: 'UAH',
            },
            {
                id: '5',
                name: 'KZT',
            }
        ];

        await Currency.bulkCreate(currenciesToAdd);
        console.log('The Currencies table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Currencies table:', error);
    }
}

module.exports = seedCurrencies();