require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware');
const seedData = require('./tests/seed_data/seed_data');
const logger = require("./logger");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Error Handling, last Middleware
app.use(errorHandler);

const start = async () => {
    try {
        sequelize.options.logging = (message) => {
            logger.info(message);
        }

        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        await seedData();

        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
        });
    } catch (e) {
        logger.error(e);
    }
};


start();

module.exports = { start};

