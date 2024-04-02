import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/ItemRoutes';
import { connectDB } from './db/connection';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});