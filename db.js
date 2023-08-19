const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.PG_DB_URL,
    {
        dialect: 'postgres',
        logging: true,
    }
)
