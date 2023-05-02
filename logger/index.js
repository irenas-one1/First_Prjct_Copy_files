const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "Winston logger";
const log_file_path = process.env.log_file_path;

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
            level: 'info'
        }),
        new transports.File({
            level: 'info',
            filename: log_file_path
        })
    ]
})

module.exports = logger;
