const { StorageLocation } = require('./../models/models');
const {User} = require("../models/models");

async function seedStorageLocations() {
    try {
        const storageLocationsToAdd = [
            {
                id: '1',
                name: 'Pantry',
            },
            {
                id: '2',
                name: 'Refrigerator',
            },
            {
                id: '3',
                name: 'Freezer',
            },
            {
                id: '4',
                name: 'Cupboard',
            },
            {
                id: '5',
                name: 'Spice Rack',
            },
            {
                id: '6',
                name: 'Drawer',
            },
            {
                id: '7',
                name: 'Fruit Bowl',
            },
            {
                id: '8',
                name: 'Wine Rack',
            },
            {
                id: '9',
                name: 'Bread Box',
            },

            {
                id: '10',
                name: 'Canning Shelf',
            }
        ];

        //await StorageLocation.destroy({truncate: true})
        await StorageLocation.bulkCreate(storageLocationsToAdd);
        console.log('The StorageLocations table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the StorageLocations table:', error);
    }
}

module.exports = seedStorageLocations();