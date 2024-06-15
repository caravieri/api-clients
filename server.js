
import fastify from 'fastify';
import { databaseMemory } from './database/database-memory.js';

const server = fastify();

const database = new databaseMemory();

server.post('/clients', (request, replay) => {

  const {name, email} = request.body

  database.create({
    name,
    email
  })

  console.log(database.list());

  return replay.status(201).send()
})

server.get('/clients', () => {
    const clients = database.list();
    return clients;
})

server.put('/clients/:id', (request, replay) => {
    const clientsID = request.params.id
    const {name, email} = request.body

    database.update(clientsID, {
      name,
      email
    });

    return replay.status(204).send()
}) 

server.delete('/clients/:id', (request, replay) => {
  const clientsID = request.params.id

  database.delete(clientsID)

  return replay.status(204).send()
}) 

server.listen({
    port: 3333
})
