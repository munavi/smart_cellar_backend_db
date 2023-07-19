const { User } = require('./../models/models');

async function seedUsers() {
    try {
        const usersToAdd = [
            {
                email: 'user1@example.com',
                password: 'password1',
            },
            {
                email: 'user2@example.com',
                password: 'password2',
            }
        ];

        await User.bulkCreate(usersToAdd);
        console.log('The Users table has been successfully populated with data.');
    } catch (error) {
        console.error('Error filling the Users table:', error);
    }
}

module.exports = seedUsers();