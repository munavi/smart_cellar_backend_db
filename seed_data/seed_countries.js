const { Country } = require('./../models/models');

async function seedCountries() {
    try {
        const countriesToAdd = [
            {
                id: '1',
                name: 'Germany',
            },
            {
                id: '2',
                name: 'USA',
            },
            {
                id: '3',
                name: 'China',
            },
            {
                id: '4',
                name: 'Ukraine',
            },
            {
                id: '5',
                name: 'Kazakhstan',
            }
        ];

        await Country.bulkCreate(countriesToAdd);
        console.log('The Countries table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Countries table:', error);
    }
}

module.exports = seedCountries();