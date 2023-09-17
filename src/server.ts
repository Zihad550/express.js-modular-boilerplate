import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', (error) => {
  console.log('Uncaught exception is detected......');
  console.log(error);
  process.exit(1);
});
let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.dbUri as string);
    console.log(`Successfully connected to DB`);
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  // it detects async promises, async errors
  process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection is detected, we are closing our server');
    if (server)
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    else process.exit(1);
  });
}

bootstrap();
