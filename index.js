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
    sequelize.options.logging = (message) => {
        logger.info(message);
    }

    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        await seedData();

        const server = app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
        });
        process.on('SIGINT', async () => {
            try {
                await sequelize.close();
                server.close(() => {
                    logger.info('Server has been stopped');
                    process.exit(0);
                });
            } catch (e) {
                logger.error('Error while closing server:', e);
                process.exit(1);
            }
        });
        return server;
    } catch (e) {
        logger.error(e);
    }
};

start();

module.exports = start;

