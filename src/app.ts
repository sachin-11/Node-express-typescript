import express from 'express';
import cluster from 'cluster';
import os from 'os'; // Node.js module for operating system-related utility methods
import bodyParser from 'body-parser';
import { router } from './routes/ItemRoutes';
import { connectDB } from './db/connection';

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

  app.use(bodyParser.json());
  app.use('/api', router);

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} is listening on port ${PORT}`);
    });
  });
}