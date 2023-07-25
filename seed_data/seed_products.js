const { Product, User, Category, StorageLocation  } = require('./../models/models');
const faker = require('faker');

function generateRandomProductName() {
    const maxLength = 50;
    const productName = faker.commerce.productName();
    return productName.slice(0, maxLength);
}
function generateRandomNumber() {
    return Math.floor(Math.random() * 255) + 1;
}

function generateRandomDate() {
    const startDate = new Date('2023-07-07');
    const endDate = new Date('2025-05-05');
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toISOString().split('T')[0];
}

function getRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function seedProducts(createdUsers, createdCategories, createdStorageLocations) {
    try {

        const categoriesIds = createdCategories.map(category => category.id);
        const storageLocationsIds = createdStorageLocations.map(location => location.id);
        const UsersIds = createdUsers.map(user => user.id);

        const profilesToAdd = [];
        for (let i = 0; i < 64; i++) {
            const profile = {
                "name": generateRandomProductName(),
                "quantity": generateRandomNumber(1, 30),
                "date": generateRandomDate(),
                "categoryId": getRandomItemFromArray(categoriesIds),
                "storageLocationId": getRandomItemFromArray(storageLocationsIds),
                "userId": getRandomItemFromArray(UsersIds),
            };
            profilesToAdd.push(profile);
        }
        // console.log(profilesToAdd)

        await Product.bulkCreate(profilesToAdd);
        console.log('The Products table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Products table:', error);
    }
}

module.exports = seedProducts;