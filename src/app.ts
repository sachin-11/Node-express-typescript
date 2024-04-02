import express from 'express';
import cluster from 'cluster';
import os from 'os'; // Node.js module for operating system-related utility methods
import bodyParser from 'body-parser';
import { router } from './routes/ItemRoutes';
import { connectDB } from './db/connection';
import winston from 'winston';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Logging setup
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    next();
  });

  app.use(bodyParser.json());
  app.use('/api', router);

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} is listening on port ${PORT}`);
    });
  });
}