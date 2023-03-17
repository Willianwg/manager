import { app } from "./app";

const server = app;

server.listen(process.env.PORT || 3002, ()=>{
    console.log(process.env.PAYPAL_ACCESS_TOKEN)
    console.log("server running...");
})
