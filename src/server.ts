import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

function encryptPassword(req: Request, res: Response, next: NextFunction){
    const { password } = req.body;
    const encrypted = bcrypt.hashSync(password, 10);

    req.body.password = encrypted;

    next();
}

const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    return res.send("Hello");
})

app.post("/manager", encryptPassword, (req, res)=>{
   console.log(req.body.password);

   return res.json("Saved");
})

app.post("/:manager_id/seller", encryptPassword, (req, res)=>{
    return res.json("Hello");
})

app.get("/manager/:id", (req, res)=>{
    return res.json("Hello");
})

app.get("/seller/:id", (req, res)=>{
    return res.json("Hello");
})


app.post("/:manager_id/product", (req, res)=>{
    
})





app.listen(process.env.PORT || 3000, ()=>{
    console.log("server running...");
})