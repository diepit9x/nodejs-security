import express from 'express';
import errorHandler from '@/middlewares/error.handler';
import responseHandler from '@/middlewares/response.handler';
import routes from '@/routes';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(responseHandler);

routes(app);

app.use(errorHandler);

export default app;
