import pool from '../config/db.js';

export const getAllTarefas = async (concluido) => {
    let query = 'SELECT * FROM tarefas';
    const values = [];

    if (concluido !== undefined) {
        query += " WHERE concluido = ?";
        values.push(concluido === "true");
    }
    
    const [rows] = await pool.execute(query, values);
    return rows;
};

export const getTarefasByID = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM tarefas WHERE id = ?', [id]);
    return rows[0];
};

export const createTarefa = async (nome, descricao) => {
    await pool.execute('INSERT INTO tarefas (nome, descricao, concluido) VALUES (?, ?, ?)',[nome, descricao, false]);
};

export const updateTarefa = async (id, nome, descricao, concluido) => {
    await pool.execute('UPDATE tarefas SET nome = ?, descricao = ?, concluido = ? WHERE id = ?', [nome, descricao, concluido, id]);
};

export const deleteTarefa = async (id) => {
    await pool.execute('DELETE FROM tarefas WHERE id = ?', [id]);
};