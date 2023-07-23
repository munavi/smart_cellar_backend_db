const { User } = require('./../models/models');

async function seedUsers() {
    try {
        const usersToAdd = [
            {
                email: 'admin',
                password: '$2b$05$85rfphiPVJmaVQPpxA6ucOl4vwYJ0CKkH.n8JbLIEkzNtoe7h9AQy',
            },
            {
                email: 'user1@example.com',
                password: 'password1',
            },
            {
                email: 'user2@example.com',
                password: 'password2',
            }
        ];

        const createdUsers = await User.bulkCreate(usersToAdd);
        console.log('The Users table has been successfully populated with data.');
        return createdUsers;
    } catch (error) {
        console.error('Error filling the Users table:', error);
    }
}

module.exports = seedUsers;