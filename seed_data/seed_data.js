const seedUsers = require('./seed_users');
const seedCountries = require('./seed_countries');
const seedCurrencies = require('./seed_currencies');
const seedStorageLocations = require('./seed_storage_locations');
const seedCategories = require("./seed_categories");
const seedProfiles = require("./seed_profiles");

async function seedData() {
    try {
        //await seedUsers()
        //await seedCountries()
        //await seedCurrencies()
        await seedProfiles()
        await seedStorageLocations()
        await seedCategories()


        console.log('The Seed Data has been successfully populated with data.');
    } catch (error) {
        console.error('Error seeding Data', error);
    }
}

module.exports = seedData;