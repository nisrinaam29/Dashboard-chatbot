import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_SCHEMA || '',
  process.env.DB_USER || '',
  process.env.DB_PASS || '', // Keep this empty if no password
  {
    host: process.env.DB_HOST || 'localhost', // Changed to localhost
    port: 3306, // Added port
    dialect: 'mysql',
    dialectModule: require('mysql2')
  }
)
