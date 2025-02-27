import { getAllTarefas, getTarefasByID, createTarefa, updateTarefa, deleteTarefa } from "../models/tarefaModel.js";

export const listarTarefas = async (req, res) => {
    try {
        const { concluido } = req.query;
        const tarefas = await getAllTarefas(concluido);
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
};

export const buscarTarefaPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tarefa = await getTarefasByID(id);
        if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefa" });
    }
};

export const criarTarefa = async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        if (!nome || !descricao) return res.status(404).json({ error: "Nome e Descrição são campos obrigatórios" });

        await createTarefa(nome, descricao);
        res.status(200).json({ message: "Tarefa criada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
};

export const alterarTarefa = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, descricao, concluido } = req.body;

        const tarefa = await getTarefasByID(id);
        if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });

        await updateTarefa(id, nome, descricao, concluido);
        res.status(200).json({ message: "Tarefa alterada com sucesso" });
    } catch (error) {
        res.status(500).send(error);//json({ error: "Erro ao altualizar tarefa" });
    }
};

export const excluirTarefa = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tarefa = await getTarefasByID(id);
        if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });

        await deleteTarefa(id);
        res.status(200).json({ message: "Tarefa excluida com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir tarefa" });
    }
};