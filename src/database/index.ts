import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
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
