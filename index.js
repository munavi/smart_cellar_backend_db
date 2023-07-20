require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const seedData = require("./seed_data/seed_data");

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
        await sequelize.sync({force: true})
        await seedData()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()
