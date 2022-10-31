import path from 'path';
import { dirname } from 'path';
import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Serve frontend (DEPLOY)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

const port = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(port, () => console.log(`Server started on port ${port}`)));