import dotenv from "dotenv";
dotenv.config();


const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_DATABASE || "diplomatic_freight";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "12345678";
const DB_DIALECT = process.env.DB_CONNECTION || "mysql";

export default {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },

  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false, // optional: disable SQL logs in production
  },
};
