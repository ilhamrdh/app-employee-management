import express from 'express';
import { authRouter } from './auth-router';
import { employeeRouter } from './employee-router';
import { departmentRouter } from './department-router';

const v1Router = express.Router();

v1Router.use('/v1', authRouter);
v1Router.use('/v1', employeeRouter);
v1Router.use('/v1', departmentRouter);

export { v1Router };
