import { Router } from "express";
import { encryptPassword } from "./middlewares/encryptPassword";

const router = Router();

router.get("/", (req, res)=>{
    return res.send("Hello");
})

router.post("/manager", encryptPassword, (req, res)=>{
   console.log(req.body.password);

   return res.json("Saved");
})

router.post("/:manager_id/seller", encryptPassword, (req, res)=>{
    return res.json("Hello");
})

router.get("/manager/:id", (req, res)=>{
    return res.json("Hello");
})

router.get("/seller/:id", (req, res)=>{
    return res.json("Hello");
})


router.post("/:manager_id/product", (req, res)=>{
    
})


export const routes = router;