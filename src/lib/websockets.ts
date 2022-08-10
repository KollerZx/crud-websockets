import { Server as HttpServer } from "http";
import {Server, ServerOptions} from "socket.io";
import { TodoRepository } from "../interfaces";
import { Handler } from "./handler";

export function createApp(server: HttpServer, repository: TodoRepository, options?: Partial<ServerOptions>){
    const io = new Server(server, options);
    const handler = new Handler(repository, io);
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);
        socket.on("create", async (data) => await handler.create(data));
        socket.on("read", async (id) => await handler.findById(id));;
        socket.on("update", async (data) => await handler.update(data.id, data.payload));
        socket.on("delete", async (id) => await handler.deleteById(id));
        socket.on("list", async () => await handler.findAll());
    })

    return io;
}






