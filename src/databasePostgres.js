// src/databasePostgres.js

import pg from 'pg'; // Importa o módulo pg para interagir com o PostgreSQL

// Desestruturação do módulo Pool da biblioteca pg
const { Pool } = pg;

// Classe DatabasePostgres para gerenciar a interação com o banco de dados
export class DatabasePostgres {
  constructor() {
    // Criação do pool de conexões com o banco de dados
    this.pool = new Pool({
      user: process.env.DATABASE_USER || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      database: process.env.DATABASE_NAME || 'mydatabase',
      password: process.env.DATABASE_PASSWORD || 'mypassword',
      port: process.env.DATABASE_PORT || 5432,
    });
  }

  // Método para executar consultas SQL
  async query(queryText, params) {
    const client = await this.pool.connect(); // Conecta ao pool
    try {
      const result = await client.query(queryText, params); // Executa a consulta
      return result.rows; // Retorna os resultados da consulta
    } catch (err) {
      console.error('Erro na execução da consulta:', err);
      throw err; // Lança erro para tratamento em nível superior
    } finally {
      client.release(); // Libera o cliente de volta para o pool
    }
  }

  // Método para obter todos os clientes
  async getAll() {
    const queryText = 'SELECT * FROM clientes;';
    return this.query(queryText); // Executa a consulta para todos os clientes
  }

  // Método para buscar cliente por ID
  async getById(id) {
    const queryText = 'SELECT * FROM clientes WHERE id = $1;';
    const result = await this.query(queryText, [id]); // Executa a consulta com ID
    return result.length ? result[0] : null; // Retorna o cliente ou null se não encontrado
  }

  // Método para buscar cliente por e-mail
  async findByEmail(email) {
    const queryText = 'SELECT * FROM clientes WHERE email = $1;';
    const result = await this.query(queryText, [email]); // Executa a consulta com email
    return result.length ? result[0] : null; // Retorna o cliente ou null se não encontrado
  }

  // Método para criar um novo cliente
  async create(client) {
    const { name, email } = client;
    const queryText = `
      INSERT INTO clientes (nome, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await this.query(queryText, [name, email]); // Executa a consulta de inserção
    return result[0]; // Retorna o cliente recém-criado
  }

  // Método para atualizar cliente por ID
  async update(id, client) {
    const { name, email } = client;
    const queryText = `
      UPDATE clientes
      SET nome = $1, email = $2
      WHERE id = $3
      RETURNING *;
    `;
    const result = await this.query(queryText, [name, email, id]); // Executa a consulta de atualização
    return result[0]; // Retorna o cliente atualizado
  }

  // Método para deletar cliente por ID
  async delete(id) {
    const queryText = 'DELETE FROM clientes WHERE id = $1;';
    await this.query(queryText, [id]); // Executa a consulta de exclusão
  }
}
