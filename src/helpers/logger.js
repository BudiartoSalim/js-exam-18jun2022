const winston = require('winston');

module.exports = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: {service: 'rides-service'},
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'}),
  ],
});
