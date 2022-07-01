import { format, LoggerOptions, transports } from "winston";
import { MongoDB } from "winston-mongodb";

interface LoggerConfig {
  driver: "winston";

  config: {
    winston: LoggerOptions;
  };
}

export default {
  driver: "winston",

  config: {
    winston: {
      format: format.combine(format.colorize(), format.simple()),
      transports: [
        new transports.Console({
          level: "info",
        }),
        new MongoDB({
          level: "warn",
          db: process.env.MONGODB_URL as string,
          collection: "logs",
          options: {
            useUnifiedTopology: true,
          },
        }),
      ],
    },
  },
} as LoggerConfig;
