import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error';
import { errors } from 'celebrate';

import { userRoutes } from './routes/user.routes';
import { typeRoutes } from './routes/type.routes';
import { recordRoutes } from './routes/record.routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/users', userRoutes);
server.use('/types', typeRoutes);
server.use('/records', recordRoutes);

server.use(errors())
server.use(errorMiddleware);
export { server };