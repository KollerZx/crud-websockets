import { Todo } from "./Todo";
export interface TodoRepository {
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo>;
    save(entity: Todo): Promise<Todo>;
    deleteById(id: string): Promise<void>;
    update(id: string, entity: Todo): Promise<void>;
}