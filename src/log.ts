import { createLogger, format, transports } from "winston";
import { dataDir, isProduction } from "./const";
import "winston-daily-rotate-file";
import path from "path";

const rotatingFileTransport = new transports.DailyRotateFile({
    filename: "cssa-log-%DATE%.log",
    dirname: path.join(dataDir, "log"),
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "10m",
    maxFiles: "30d"
});

const consoleTransport = new transports.Console({
    format: format.simple()
});

export const logger = createLogger({
    level: isProduction ? "info" : "debug",
    format: format.json(),
    transports: [ rotatingFileTransport, consoleTransport ],
});
