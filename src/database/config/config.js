const { DB_CONFIG } = require('@/config/env');

module.exports = {
  development: {
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    host: DB_CONFIG.host,
    dialect: DB_CONFIG.dialect,
  },
  test: {
    username: 'root',
    password: null,
    database: 'test_db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'prod_db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
