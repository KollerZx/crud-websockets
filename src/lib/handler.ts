import { Server as Socket } from "socket.io";
import { Todo, TodoRepository } from "../interfaces";

export class Handler {
    constructor(private repository: TodoRepository, private server: Socket) { }

    async create(entity: Todo): Promise<Todo> {
        const todo = await this.repository.save(entity);
        this.server.emit("create", todo);
        return todo;
    }
    async findById(id: string) {
        try {
            const todo = await this.repository.findById(id);
            this.server.emit("read", todo);
            return todo;    
        } catch (error) {
            this.server.emit('read', {})
        }
    }
    async findAll() {
        const todos = await this.repository.findAll();
        this.server.emit("list", todos);
        return todos;
    }
    async update(id: string, entity: Todo) {
        try {
            console.log('id', id);
            console.log('entity', entity);
            await this.repository.update(id, entity);
            this.server.emit("list", await this.repository.findAll());
        } catch (error) {
            this.server.emit('list', await this.repository.findAll());
        }
        
    }
    async deleteById(id: string) {
        try {
            const todo = await this.repository.deleteById(id);
            this.server.emit("delete", todo);
            return todo;    
        } catch (error) {
            this.server.emit('delete', {})
        }
    }
}