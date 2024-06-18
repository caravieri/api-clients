import { sql } from "./db.js";

async function createTable() {
  try {
    await sql`
    CREATE TABLE clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
    );
    `;
    console.log('Tabela Criada');
  } catch (err) {
    console.error('Erro ao criar a tabela:', err);
  }
}

// Chame a função async para criar a tabela
createTable();

