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

  create(client, email) {
    const clientsID = randomUUID();
    this.#clients.set(clientsID, client);
    this.#emails.set(clientsID, email);
  }

  update(id, client) {
    this.#clients.set(id, client);
  }

  delete(id) {
    this.#clients.delete(id);
  }

  findByEmail(email) {
    return this.#clients.get(client => client.email === email); //replicar o que foi feito no getAll
  }
}



