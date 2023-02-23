import { app } from "./app";

const server = app;

server.listen(process.env.PORT || 3001, ()=>{
    console.log("server running...");
})
