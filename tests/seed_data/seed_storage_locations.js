const { StorageLocation } = require('../../src/models/models');
const logger = require('../../logger');

async function seedStorageLocations() {
    try {
        const storageLocationsToAdd = [
            {
                name: 'Pantry',
            },
            {
                name: 'Refrigerator',
            },
            {
                name: 'Freezer',
            },
            {
                name: 'Cupboard',
            },
            {
                name: 'Spice Rack',
            },
            {
                name: 'Drawer',
            },
            {
                name: 'Fruit Bowl',
            },
            {
                name: 'Wine Rack',
            },
            {
                name: 'Bread Box',
            },

            {
                name: 'Canning Shelf',
            }
        ];

        const createdStorageLocations = await StorageLocation.bulkCreate(storageLocationsToAdd);
        logger.info('The StorageLocations table has been successfully populated with data.');
        return createdStorageLocations
    } catch (error) {
        logger.error('Error filling the StorageLocations table:', error);
    }
}

module.exports = seedStorageLocations;