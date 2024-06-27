import { randomUUID } from "node:crypto";

export class databaseMemory {
  #clients = new Map();
  #emails = new Map();

  // get all
  getAll() {
    const clients = [];
    for (const [id, client] of this.#clients.entries()) {
      clients.push({ id, ...client });
    }
    return clients;
  }

  list() {
    return Array.from(this.#clients.entries()).map((clientsArray) => {
      const id = clientsArray[0];
      const data = clientsArray[1];

      return {
        id,
        ...data,
      };
    });
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



