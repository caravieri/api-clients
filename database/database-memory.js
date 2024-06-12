import { randomUUID } from "node:crypto"
export class databaseMemory {
    #clients  = new Map()
    #emails = new Map()

    list() {
        return this.#clients.values()
    }

    create(clients, emails) {
        const clientsID = randomUUID()
        this.#clients.set(clientsID, clients)
        this.#emails.set(clientsID, emails)
    }

    update(id, clients) {
        this.#clients.set(id, clients)
    }

    delete(id) {
        this.#clients.delete(id)
    }
}