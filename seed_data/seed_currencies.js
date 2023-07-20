const { Currency } = require('./../models/models');
const {User} = require("../models/models");

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
        console.log('The Currencies table has been successfully populated with data.');
        return createdCurrencies;
    } catch (error) {
        console.error('Error filling the Currencies table:', error);
    }
}

module.exports = seedCurrencies;