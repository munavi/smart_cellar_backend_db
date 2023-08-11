// logger.js
const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
                filename: logFilePath,
                options: { flags: 'w' }
        })
    ]
});

module.exports = logger;
