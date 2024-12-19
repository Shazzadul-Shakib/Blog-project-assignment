import express, { Application } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import { appRoutes } from './app/routes';

export const app: Application = express();

// --- parsers --- //
app.use(express.json());
app.use(cors());

// ----- root route ----- //
app.get('/', (_, res) => {
  res.send({ message: 'Blog project server is running...' });
});

// ----- application routes ----- //
app.use('/api', appRoutes);

// ----- global error handler ----- //
app.use(globalErrorHandler);

// ----- API not found handler ----- //
app.use(notFound);
