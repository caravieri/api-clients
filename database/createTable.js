import { sql } from "./db.js";

sql `
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
`.then(() => {
    console.log('Tabela Criada')
})