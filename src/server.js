import fastify from "fastify";
import { databaseMemory } from "../database/database-memory.js";
import 'dotenv/config' // configurar porta no dotenv - Feito

const port = process.env.PORT
const server = fastify();
const database = new databaseMemory();

import 'dotenv/config'

server.listen({
  port, 
}, () => console.log("Server is running")); //try catch

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
};

// corrigir nome do parâmetro - feito
server.post("/clients", (request, reply) => {
  const { name, email } = request.body;
  const emailExists = database.findByEmail(email);

  // adicionar condições para verificar se body não está vazio, if's comuns já bastam - Feito
  if (name ===  "" ) return reply.status(400).send({status_code: 400, mensage: "Não é possível criar um nome vazio"})

  if (!email) {
    return reply.status(400).send({ status_code: 400, message: "E-mail é obrigatório" });
  }

  if (!validateEmail(email)) {
    return reply.status(400).send({ status_code: 400, message: "Formato de e-mail inválido" });
  }

  if (emailExists) {
    return reply.status(400).send({ status_code: 400, message: "E-mail já cadastrado" });
  }

  database.create({
    name,
    email,
  });
  
  return reply.status(201).send({ status_code: 201 , message: "Usúario Criado!" });
  
  // retornar o cliente criado com o id
});

server.get("/clients", (_request, reply) => {
const clients = database.getAll()
  return reply.status(200).send(clients)
});

server.put("/clients/:id", (request, reply) => {
  const clientsID = request.params.id;
  const { name, email } = request.body;
  const existingClient = database.getById(clientId);

  if (!existingClient) {
    return reply.status(404).send({ status_code: 404, message: "Cliente não encontrado" });
  }

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

  const existingClient = database.getById(clientId);
  if (!existingClient) {
    return reply.status(404).send({ status_code: 404, message: "Cliente não encontrado" });
  }
  database.delete(clientsID);

  return reply.status(204).send();
});

// como exportar requisições no postman

// docker-compose com a imagem do postgres