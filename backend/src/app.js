import express from 'express';
import cors from 'cors';
import tarefaRoutes from './routes/tarefaRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // ALTERADO AQUI PARA QUE EU POSSA ACESSAR A API PELO FRONT - APAGAR DEPOIS -
    methods: 'GET,POST,PUT,DELETE',
    allowefHeaders: 'Content-Type, Authorization'
}));

app.use('/lista_tarefas', tarefaRoutes)

export default app;