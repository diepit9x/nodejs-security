import dotenv from 'dotenv';
dotenv.config();

// App config
export const API_VERSION = process.env.API_VERSION || 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;
export const PORT = parseInt(process.env.PORT || '3000', 10);

// Database config
export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  dialect: (process.env.DB_DIALECT || 'mysql') as any,
  database: process.env.DB_NAME || 'test',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  logging: (process.env.DB_LOGGING || false) as boolean,
};

// Security config
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);
export const PEPPER = process.env.PEPPER || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
