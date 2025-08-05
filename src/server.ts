import app from '@/app';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '@/database';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to DB:', err);
  }
})();
