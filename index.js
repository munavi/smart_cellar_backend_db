require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const seedUsers = require('./seed_data/seed_users');
const seedCountries = require('./seed_data/seed_countries');
const seedCurrencies = require('./seed_data/seed_currencies');
const seedStorageLocations = require('./seed_data/seed_storage_locations');

const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)


// Error Handling, last Middleware
app.use(errorHandler)

const start = async () => {
    try {

        await sequelize.authenticate()

        // seedUsers()
        // seedCountries()
        // seedCurrencies()
        // seedStorageLocations()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()
