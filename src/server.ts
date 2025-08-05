import app from '@/app';
import { sequelize } from '@/database';
import { PORT } from '@/config/env';

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
