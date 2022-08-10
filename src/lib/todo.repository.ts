import { randomUUID } from "crypto";
import { TodoRepository, Todo } from "../interfaces";

export class InMemoryTodoRepository implements TodoRepository {
    constructor(private todos: Todo[] = []) { }

    async findAll(): Promise<Todo[]> {
        const entities = this.todos.map(t => Object.assign({}, t));
        return Promise.resolve(entities);
    }

    async findById(id: string): Promise<Todo> {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            return Promise.resolve(todo);
        }
        return Promise.reject(new Error("not found"));
    }

    async update(id: string, entity: Todo): Promise<void> {
        const todoIndex = this.todos.findIndex(t => t.id === id);
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1, {...entity, id});
            Promise.resolve();
        }
        return Promise.reject(new Error("not found"));
    }

    async save(entity: Todo): Promise<Todo> {
        const todo = Object.assign(entity, { id: randomUUID() });
        this.todos.push(todo);
        return Promise.resolve(todo);
    }

    async deleteById(id: string): Promise<void> {
        const todoIndex = this.todos.findIndex(t => t.id === id);
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1);
            return Promise.resolve();
        }
        return Promise.reject(new Error("not found"));
    }
}