const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "Winston logger";

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "debug",
    format:
        combine(
            label({ label: CATEGORY }),
            timestamp({
                format: "dd-MMM-YYYY HH:mm:ss",
            }),
            prettyPrint()
            ),

    transports: [
        new transports.Console({
            level: 'warn'
        }),
        new transports.File({
            level: 'info',
            filename: 'logs/wins_info.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/wins_errors.log'
        })
    ]
})

module.exports = logger;
