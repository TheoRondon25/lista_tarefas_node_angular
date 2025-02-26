import app from './src/app.js';
import pool from './src/config/db.js';

async function testarConexao() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado ao MySQL com sucesso!');
        connection.release(); // Libera a conexão para ser reutilizada
    } catch (error) {
        console.error('❌ Erro ao conectar ao MySQL:', error.message);
    }
}

testarConexao();


const PORT = 4000;

app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT);
});
