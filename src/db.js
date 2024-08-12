// src/db.js

import pg from 'pg';

const { Pool } = pg;

// Configuração de conexão com o banco de dados
const pool = new Pool({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'mydatabase',
  password: process.env.DATABASE_PASSWORD || 'mypassword',
  port: process.env.DATABASE_PORT || 5432,
});

// Exporta uma função SQL para realizar queries usando tagged templates
const sql = (strings, ...values) => {
  return pool.query(strings, values);
};


// Função para criar a tabela de clientes
async function createTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
      );
    `;
    console.log('Tabela clientes criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar a tabela clientes:', err);
  }
}

// Exporte os módulos para serem utilizados em outros arquivos
export { sql, createTable };
