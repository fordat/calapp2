import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));