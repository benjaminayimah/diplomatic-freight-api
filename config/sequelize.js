
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

// Use environment variables with sensible defaults for local development
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "12345678";
const DB_NAME = process.env.DB_DATABASE || "diplomatic_freight";
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_DIALECT = process.env.DB_CONNECTION || "mysql";

// Common Sequelize configuration
const commonConfig = {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: env === "production" ? false : console.log, // disable logs in production
};

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, commonConfig);

// Test database connection (optional)
sequelize
  .authenticate()
  .then(() => console.log(`Database connected (${env})`))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;

