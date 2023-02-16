import { app } from "./app";

const server = app;

server.listen(process.env.PORT || 3000, ()=>{
    console.log("server running...");
})
