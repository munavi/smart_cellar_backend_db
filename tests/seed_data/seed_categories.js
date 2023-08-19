const { Category } = require('../../src/models/models');
const logger = require("../../logger");

async function seedCategories() {
    try {
        const categoriesToAdd = [
            {
                name: 'Canned Goods',
            },
            {
                name: 'Dry Pasta and Grains',
            },
            {
                name: 'Baking Supplies',
            },
            {
                name: 'Cooking Oils',
            },
            {
                name: 'Spices and Seasonings',
            },
            {
                name: 'Condiments',
            },
            {
                name: 'Nuts and Seeds',
            },
            {
                name: 'Dried Fruits',
            },
            {
                name: 'Shelf-Stable Beverages',
            },

            {
                name: 'Medications',
            }
        ];

        const createdCategories = await Category.bulkCreate(categoriesToAdd);
        logger.info('The Categories table has been successfully populated with data.');
        return createdCategories;
    } catch (e) {
        logger.error('Error filling the Categories table:', e);
    }
}

module.exports = seedCategories;