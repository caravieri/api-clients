import pg from 'pg'; 
const { Pool } = pg;

export class DatabasePostgres {
  constructor() {
  
    this.pool = new Pool({
      user: process.env.DATABASE_USER || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      database: process.env.DATABASE_NAME || 'mydatabase',
      password: process.env.DATABASE_PASSWORD || 'mypassword',
      port: process.env.DATABASE_PORT || 5432,
    });
  }

  async query(queryText, params) {
    const client = await this.pool.connect(); 
    try {
      const result = await client.query(queryText, params); 
      return result.rows; 
    } catch (err) {
      console.error('Erro na execução da consulta:', err);
      throw err; 
    } finally {
      client.release(); 
    }
  }

  async getAll() {
    const queryText = 'SELECT * FROM clientes;';
    return this.query(queryText); 
  }

  async getById(id) {
    const queryText = 'SELECT * FROM clientes WHERE id = $1;';
    const result = await this.query(queryText, [id]); 
    return result.length ? result[0] : null; 
  }

  async findByEmail(email) {
    const queryText = 'SELECT * FROM clientes WHERE email = $1;';
    const result = await this.query(queryText, [email]); 
    return result.length ? result[0] : null; 
  }

  async create(client) {
    const { name, email } = client;
    const queryText = `
      INSERT INTO clientes (nome, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await this.query(queryText, [name, email]); 
    return result[0]; 
  }

  async update(id, client) {
    const { name, email } = client;
    const queryText = `
      UPDATE clientes
      SET nome = $1, email = $2
      WHERE id = $3
      RETURNING *;
    `;
    const result = await this.query(queryText, [name, email, id]); 
    return result[0]; 
  }

  async delete(id) {
    const queryText = 'DELETE FROM clientes WHERE id = $1;';
    await this.query(queryText, [id]); 
  }
}
