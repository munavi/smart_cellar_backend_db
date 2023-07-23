const { Product, User, Category, StorageLocation  } = require('./../models/models');

async function seedProducts(createdUsers, createdCategories, createdStorageLocations) {
    try {

        const profilesToAdd = [
            {
                "name": "Canned Tomatoes",
                "counter": 15,
                "date": "2023-10-05",
                "categoryId": createdCategories[1].id,
                "storageLocationId": createdStorageLocations[1].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Canned Soup",
                "counter": 8,
                "date": "2023-10-15",
                "categoryId": createdCategories[1].id,
                "storageLocationId": createdStorageLocations[2].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Spaghetti",
                "counter": 3,
                "date": "2023-11-02",
                "categoryId": createdCategories[2].id,
                "storageLocationId": createdStorageLocations[1].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Quinoa",
                "counter": 5,
                "date": "2023-11-20",
                "categoryId": createdCategories[2].id,
                "storageLocationId": createdStorageLocations[3].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Baking Powder",
                "counter": 2,
                "date": "2023-12-08",
                "categoryId": createdCategories[3].id,
                "storageLocationId": createdStorageLocations[4].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Olive Oil",
                "counter": 1,
                "date": "2023-12-25",
                "categoryId": createdCategories[3].id,
                "storageLocationId": createdStorageLocations[2].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Soy Sauce",
                "counter": 4,
                "date": "2024-01-10",
                "categoryId": createdCategories[6].id,
                "storageLocationId": createdStorageLocations[4].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Ketchup",
                "counter": 6,
                "date": "2024-01-18",
                "categoryId": createdCategories[6].id,
                "storageLocationId": createdStorageLocations[1].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Almonds",
                "counter": 10,
                "date": "2024-01-28",
                "categoryId": createdCategories[7].id,
                "storageLocationId": createdStorageLocations[5].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Pistachios",
                "counter": 12,
                "date": "2024-02-01",
                "categoryId": createdCategories[7].id,
                "storageLocationId": createdStorageLocations[2].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Raisins",
                "counter": 7,
                "date": "2024-02-02",
                "categoryId": createdCategories[8].id,
                "storageLocationId": createdStorageLocations[6].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Dried Apricots",
                "counter": 3,
                "date": "2023-10-12",
                "categoryId": createdCategories[8].id,
                "storageLocationId": createdStorageLocations[1].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Orange Juice",
                "counter": 4,
                "date": "2023-10-25",
                "categoryId": createdCategories[9].id,
                "storageLocationId": createdStorageLocations[7].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Soda",
                "counter": 6,
                "date": "2023-11-12",
                "categoryId": createdCategories[9].id,
                "storageLocationId": createdStorageLocations[2].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Aspirin",
                "counter": 1,
                "date": "2023-12-05",
                "categoryId": createdCategories[1].id,
                "storageLocationId": createdStorageLocations[3].id,
                "userId": createdUsers[0].id,
            },
            {
                "name": "Antacid",
                "counter": 2,
                "date": "2024-01-21",
                "categoryId": createdCategories[1].id,
                "storageLocationId": createdStorageLocations[1].id,
                "userId": createdUsers[0].id,
            }

        ];

        await Product.bulkCreate(profilesToAdd);
        console.log('The Products table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Products table:', error);
    }
}

module.exports = seedProducts;