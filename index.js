require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware');
const seedData = require('./tests/seed_data/seed_data');

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Error Handling, last Middleware
app.use(errorHandler);

const logFilePath = path.join('./', 'app.log');
const sequelizeLogFilePath = path.join(__dirname, 'sequelize.log');

const oldConsoleLog = console.log;

console.log = function (...args) {
    const logMessage = args.join(' ');
    fs.appendFileSync(logFilePath, logMessage + '\n');
};

const sequelizeLogStream = fs.createWriteStream(sequelizeLogFilePath, { flags: 'a' });

let server;
const start = async () => {
    try {
        sequelize.options.logging = (message) => {
            sequelizeLogStream.write(`${new Date().toISOString()} - ${message}\n`);
        };

        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        await seedData();

        server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        process.on('SIGINT', () => {
            stop();
        });
    } catch (e) {
        console.log(e);
    }

};

const stop = () => {
    if (server) {
        server.close(() => {
            console.log('Server stopped.');
            process.exit(0);
        });
    } else {
        console.log('Server instance not found.');
        process.exit(1);
    }
};

start();

module.exports = { start, stop, server };
