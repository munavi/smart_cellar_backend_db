const bcrypt = require('bcrypt');
const { User } = require('../../src/models/models');

async function seedUsers() {
    try {
        const usersToAdd = [
            {
                email: 'admin',
                password: '12345',
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

        const hashedUsersToAdd = await Promise.all(usersToAdd.map(async user => {
            if (!user.password.startsWith('$2b$')) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                return { ...user, password: hashedPassword };
            }
            return user;
        }));

        const createdUsers = await User.bulkCreate(hashedUsersToAdd);
        console.log('The Users table has been successfully populated with data.');
        return createdUsers;
    } catch (error) {
        console.error('Error filling the Users table:', error);
    }
}

module.exports = seedUsers;