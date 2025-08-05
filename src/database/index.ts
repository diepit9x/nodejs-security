import { Sequelize, Dialect } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { DB_CONFIG } from '@/config/env';

const sequelize = new Sequelize(
  DB_CONFIG.database,
  DB_CONFIG.username,
  DB_CONFIG.password,
  {
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    dialect: DB_CONFIG.dialect as Dialect,
    logging: false,
  }
);

const models: Record<string, any> = {};

const modelsPath = path.join(__dirname, 'models');

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
  .forEach((file) => {
    const modelModule = require(path.join(modelsPath, file));

    Object.keys(modelModule).forEach((exported) => {
      if (exported.startsWith('init')) {
        modelModule[exported](sequelize);
      }

      if (/^[A-Z]/.test(exported)) {
        models[exported] = modelModule[exported];
      }
    });
  });

export { sequelize };
export default models;
