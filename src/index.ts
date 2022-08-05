import { httpServer } from "./lib/httpServer";
import { InMemoryTodoRepository } from "./lib/todo.repository";
import { createApp } from "./lib/websockets";
const repository = new InMemoryTodoRepository();

httpServer.listen(3000, () => {
    console.log("listening on *:3000");
})
createApp(httpServer, repository);