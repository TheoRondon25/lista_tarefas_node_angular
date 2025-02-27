import express from 'express';
import { listarTarefas, buscarTarefaPorId, criarTarefa, alterarTarefa, excluirTarefa } from '../controllers/tarefaController.js';

const router = express.Router();

router.get('/', listarTarefas);
router.get('/:id', buscarTarefaPorId);
router.post('/', criarTarefa);
router.put('/:id', alterarTarefa);
router.delete('/:id', excluirTarefa);

export default router;
