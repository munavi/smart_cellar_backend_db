const seedProfiles = require("./seed_profiles");
const seedProducts = require("./seed_products");
const seedUsers = require("./seed_users");
const seedCountries = require("./seed_countries");
const seedCurrencies = require("./seed_currencies");
const seedCategories = require("./seed_categories");
const seedStorageLocations = require("./seed_storage_locations");
const logger = require('../../logger');

async function seedData() {
    try {
        const createdUsers = await seedUsers();
        const createdCountries = await seedCountries();
        const createdCurrencies = await seedCurrencies();
        const createdCategories = await seedCategories();
        const createdStorageLocations = await seedStorageLocations();

        await seedProfiles(createdUsers, createdCountries, createdCurrencies);
        await seedProducts(createdUsers, createdCategories, createdStorageLocations);

        logger.info('The Seed Data has been successfully populated with data.');
    } catch (e) {
        logger.error('Error seeding Data', e);
    }
}

module.exports = seedData;