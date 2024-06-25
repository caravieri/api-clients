import { randomUUID } from "node:crypto";

export class databaseMemory {
  #clients = new Map();
  #emails = new Map();

  // get all
  getAll() {
    const clients = [];
    let i = 0;
    while (i < this.#clients.size) {
      const client = this.#clients.values().next().value;
      clients.push(client);
      i++;
    }
    return clients
  }

  getById(id) {
    return this.#clients.get(id); //replicar o que foi feito no getAll
  }

  create(clients, emails) {
    const clientsID = randomUUID();
    this.#clients.set(clientsID, clients);
    this.#emails.set(clientsID, emails);
  }

  update(id, clients) {
    this.#clients.set(id, clients);
  }

  delete(id) {
    this.#clients.delete(id);
  }

  findByEmail(email) {
    return this.#clients.get(client => client.email === email); //replicar o que foi feito no getAll
  }
}



