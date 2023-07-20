const { Category } = require('./../models/models');

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

        const createdCategories =await Category.bulkCreate(categoriesToAdd);
        console.log('The Categories table has been successfully populated with data.');
        return createdCategories;
    } catch (error) {
        console.error('Error filling the Categories table:', error);
    }
}

module.exports = seedCategories;