import express from "express";

const app = express();
app.use(express.json());

let tarefas = [
    {
        id: 1,
        nome_proprietario: "Theo Rondon",
        descricao: "Montar base",
        concluido: false
    },
    {
        id: 2,
        nome_proprietario: "Theo Rondon",
        descricao: "enviar base",
        concluido: false
    },
    {
        id: 3,
        nome_proprietario: "Theo Rondon",
        descricao: "anotar feito",
        concluido: false
    },
];

// lendo todas as tarefas e filtro por concluido ou nao
app.get("/lista_tarefas", (req, res) => {
    const { concluido } = req.query;

    if (concluido !== undefined) {
        const filtradas = tarefas.filter((tarefa) => tarefa.concluido === (concluido === "true"));
        return res.status(200).json(filtradas);
    }

    res.status(200).json(tarefas);
});

// buscar tarefa pelo id
app.get("/lista_tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);

    if (!tarefa) {
        return res.status(404).json({ error: "tarefa nao encontrada" });
    }

    res.status(200).json(tarefa);
});

// criando uma nova tarefa
app.post("/lista_tarefas/criar_nova", (req, res) => {
    const { nome_proprietario } = req.body;
    const { descricao } = req.body;

    if (!descricao || !nome_proprietario) {
        return res.status(400).json({ error: 'descricao e nome do proprietario é obrigatório' });
    };

    const tarefa = {
        id: tarefas.length + 1,
        nome_proprietario,
        descricao,
        concluido: false
    };

    tarefas.push(tarefa);

    res.status(200).json({ message: 'Tarefa criada' });
});

// alterando tarefa (marcando concluido tambem)
app.put("/lista_tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    const { nome_proprietario, descricao, concluido } = req.body;

    if (!tarefa) {
        return res.status(404).json({ error: "tarefa nao encontrada" })
    }

    if (nome_proprietario) tarefa.nome_proprietario = nome_proprietario;
    if (descricao) tarefa.descricao = descricao;
    if (typeof concluido === "boolean") tarefa.concluido = concluido;
    if (!nome_proprietario && !descricao && !concluido) {
        res.status(200).send("Nada a ser alterado");
    }

    res.status(200).send("tarefa alterada com sucesso");

});

// deletando uma tarefa
app.delete("/lista_tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);

    if (!tarefa) {
        return res.status(404).json({ error: "Tarefa nao encontrada" });
    }

    const index = tarefas.findIndex((tarefa) => tarefa.id === id);
    tarefas.splice(index, 1);
    return res.status(200).json({ message: "Tarefa excluida com sucesso!" });
});

export default app;