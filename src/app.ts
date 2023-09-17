import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

// routes

const app: Application = express();

// middlewares
app.use(cors());
// * parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// test route
// TODO: remove after checking the app
app.use('/api/test', (req, res) => {
  res.status(200).json({
    message: 'Hello, Nice to meet you.',
  });
});

// * handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
