// const ProductController = require('../../src/controllers/productController')
// const { Product, User, Category, StorageLocation, Country, Currency, Profile} = require('../../src/models/models');
// const expect = require("expect");
//
// // Mocking the Express response object
// const res = {
//     json: jest.fn(),
//     status: jest.fn().mockReturnThis(),
// };
//
// // Mocking the Express request object
// const req = {
//     params: {},
//     body: {},
// };
//
// // Mocking the next function for error handling
// const next = jest.fn();
//
// // Helper function to create a product
// const createProduct = async (productData) => {
//     const product = await Product.create(productData);
//     await product.reload();
//     return product;
// };
//
// describe('ProductController', () => {
//     // Before each test, ensure the database is clean and seed initial data if needed
//     beforeEach(async () => {
//         await Product.destroy({ where: {} });
//         await User.destroy({ where: {} });
//         await Category.destroy({ where: {} });
//         await StorageLocation.destroy({ where: {} });
//         await Country.destroy({ where: {} });
//         await Currency.destroy({ where: {} });
//         await Profile.destroy({ where: {} });
//         // await seedTestData();
//     });
//
//     describe('create', () => {
//         it('should create a new product', async () => {
//             const user = await User.create({ email: 'admin', password: '12345', });
//             const category = await Category.create({ name: 'Canned Goods', });
//             const storageLocation = await StorageLocation.create({ name: 'Pantry',});
//             const testData = {
//                 name: 'Test Product',
//                 quantity: 10,
//                 date: '2023-07-26',
//                 categoryId: category.id, // Assuming a valid category ID in the database
//                 storageLocationId: storageLocation.id, // Assuming a valid storage location ID in the database
//                 userId: user.id, // Assuming a valid user ID in the database
//             };
//
//             // Set the request body
//             req.body = testData;
//
//             // Make the API call
//             await productController.create(req, res, next);
//
//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testData));
//         });
//
//         // Add more tests for error cases (e.g., missing required fields, invalid IDs, etc.)
//     });
//
//     describe('getProductsByUserId', () => {
//         it('should get products by user ID', async () => {
//             // Seed some test data
//             const user = await User.create({ email: 'admin', password: '12345', });
//             const category = await Category.create({ name: 'Canned Goods', });
//             const storageLocation = await StorageLocation.create({ name: 'Pantry',});
//
//             const product1 = await createProduct({
//                 name: 'Product 1',
//                 quantity: 5,
//                 date: '2023-07-25',
//                 categoryId: category.id,
//                 storageLocationId: storageLocation.id,
//                 userId: user.id,
//             });
//
//             const product2 = await createProduct({
//                 name: 'Product 2',
//                 quantity: 3,
//                 date: '2023-07-26',
//                 categoryId: category.id,
//                 storageLocationId: storageLocation.id,
//                 userId: user.id,
//             });
//
//             // Set the request parameters
//             req.params.userId = user.id;
//
//             // Make the API call
//             await productController.getProductsByUserId(req, res, next);
//
//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
//                 expect.objectContaining(product1.toJSON()),
//                 expect.objectContaining(product2.toJSON()),
//             ]));
//         });
//
//         // Add more tests for error cases (e.g., invalid user ID, no products for the user, etc.)
//     });
//
//     // Add tests for other methods (update and removeOne) in a similar fashion
// });
