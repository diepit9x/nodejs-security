module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'nodejs_demo3',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
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
