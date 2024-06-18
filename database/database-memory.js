import { randomUUID } from "node:crypto";

export class databaseMemory {
  #clients = new Map();
  #emails = new Map();

  // get all
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
    // fazer implementação
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
}
