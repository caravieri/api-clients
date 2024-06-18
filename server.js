import fastify from "fastify";
import { databaseMemory } from "./database/database-memory.js";

// configurar porta no dotenv - Feito

const server = fastify();
const database = new databaseMemory();
import 'dotenv/config'

server.listen({
  port: process.env.PORT,
});

console.log("Server is running");

// corrigir nome do parâmetro - feito
server.post("/clients", (request, reply) => {
  const { name, email } = request.body;

  // adicionar condições para verificar se body não está vazio, if's comuns já bastam - Feito
    if (name ===  "" ) return reply.status(400).send({status_code: 400, mensage: "Não é possível criar um nome vazio"})

    
  // verificar se o e-mail já existe

  database.create({
    name,
    email,
  });

  // retornar o cliente criado com o id

  return reply.status(201).send();
});

server.get("/clients", () => {
  const clients = database.list();

  return clients;
});

// método getById, para retornar apenas um cliente, caso não encontrar retornar uma mensagem de erro de não encontrado
// server.getById("/clients/:id", () => {
//   const clients = database.list();

//   return clients;
// });

// verificar antes se o cliente existe e depois atualizar e verificar se o e-mail já existe para outro usuário (findByEmail)
// tudo com as devidas mensagens de erro
server.put("/clients/:id", (request, reply) => {
  const clientsID = request.params.id;
  const { name, email } = request.body;

  database.update(clientsID, {
    name,
    email,
  });

  // retornar o usuário atualizado com id

  return reply.status(204).send();
});

// verificar se o usuário existe
server.delete("/clients/:id", (request, reply) => {
  const clientsID = request.params.id;

  database.delete(clientsID);

  return reply.status(204).send();
});

// como exportar requisições no postman

// docker-compose com a imagem do postgres
