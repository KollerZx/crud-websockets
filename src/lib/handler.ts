import { Server as Socket } from "socket.io";
import { Todo, TodoRepository } from "../interfaces";

export class Handler {
    constructor(private repository: TodoRepository, private server: Socket){}

    async create(entity: Todo): Promise<Todo> {
        const todo = await this.repository.save(entity);
        this.server.emit("create", todo);
        return todo;
    }
    async findById(id: string){
        const todo = await this.repository.findById(id);
        this.server.emit("read", todo);
        return todo;
    }
    async findAll(){
        const todos = await this.repository.findAll();
        this.server.emit("list", todos);
        return todos;
    }
    async update(id: string, entity: Todo){
        await this.repository.update(id, entity);
        this.server.emit("list", await this.repository.findAll());
    }
    async deleteById(id: string){
        const todo = await this.repository.deleteById(id);
        this.server.emit("delete", todo);
        return todo;
    }
}