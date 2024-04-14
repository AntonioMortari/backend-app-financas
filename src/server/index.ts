import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error';

import { userRoutes } from './routes/user.routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/users', userRoutes);

server.use(errorMiddleware);
export { server };