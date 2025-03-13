import express from 'express';
import cors from 'cors';
import tarefaRoutes from './routes/tarefaRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/lista_tarefas', tarefaRoutes)

export default app;