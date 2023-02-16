import { Router } from "express";
import { PrismaManagerRepository } from "../infra/repositories/managerRepository";
import { CreateManager } from "../useCases/createManager";
import { AddSeller } from "../useCases/addSeller";
import { IdGenerator } from "../utils/idGenerator";
import { encryptPassword } from "./middlewares/encryptPassword";
import { PrismaSellerRepository } from "../infra/repositories/sellerRepository";
import { GetManager } from "../useCases/getManager";

const idGenerator = new IdGenerator();
const managerRepository = new PrismaManagerRepository();
const createManager = new CreateManager(managerRepository, idGenerator);
const sellerRepository = new PrismaSellerRepository();
const addSeller = new AddSeller(managerRepository, sellerRepository, idGenerator);
const getManager = new GetManager(managerRepository);

const router = Router();

router.get("/", (req, res)=>{
    return res.send("Hello");
})

router.post("/manager", encryptPassword, async (req, res)=>{
    const { manager } = await createManager.execute({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    });

    if(manager){
        return res.json(manager);
    }

    return res.status(400).json({ error:"It was not possible to create a manager"});
})

router.post("/seller", encryptPassword, async (req, res)=>{
    const { seller } = await addSeller.execute({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        managerId: req.body.managerId,
    });

    if(seller){
        return res.json(seller);
    }

    return res.status(400).json({ error:"It was not possible to create a seller"});
})

router.post("/:manager_id/seller", encryptPassword, (req, res)=>{
    return res.json("Hello");
})

router.get("/manager/:id", async (req, res)=>{
    const { manager } = await getManager.execute({
        id: req.params.id,
    })

    if(manager){
        return res.json(manager);
    }

    return res.status(404).json({ error:"It was not possible to find the manager"});
})

router.get("/seller/:id", (req, res)=>{
    return res.json("Hello");
})


router.post("/:manager_id/product", (req, res)=>{
    
})


export const routes = router;