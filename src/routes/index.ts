import { Express } from 'express';
import userRoutes from '@/routes/user.route';
import { API_PREFIX } from '@/config/env';

const routes = (app: Express) => {
  app.use(`${API_PREFIX}/user`, userRoutes);
};

export default routes;
