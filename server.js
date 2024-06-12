
import fastify from 'fastify';
import { databaseMemory } from './database/database-memory.js';

const server = fastify();

const database = new databaseMemory();

server.post('/clients', (req, res) => {
  database.create({
    name:  'Guilherme',
    email: 'guilherme@gmail.com'
  })
  console.log(database.list());

  return res.status(201).send()
})

server.get('/clients', () => {
    return 'Hello Guilherme!'
})

server.put('/clients/:id', () => {
    return 'Hello Node!'
}) 

server.delete('/clients/:id', () => {
    return 'Hello Node!'
}) 

server.listen({
    port: 3333
})
