import { Router } from "express";
import { PrismaManagerRepository } from "../infra/repositories/managerRepository";
import { CreateManager } from "../domain/useCases/createManager";
import { AddSeller } from "../domain/useCases/addSeller";
import { IdGenerator } from "../utils/idGenerator";
import { encryptPassword } from "./middlewares/encryptPassword";
import { PrismaSellerRepository } from "../infra/repositories/sellerRepository";
import { GetManager } from "../domain/useCases/getManager";
import { AddProduct } from "../domain/useCases/addProduct";
import { PrismaProductRepository } from "../infra/repositories/productRepository";
import { AddSale } from "../domain/useCases/addSale";
import { PrismaSaleRepository } from "../infra/repositories/saleRepository";
import { HttpManagerMapper } from "./mappers/httpManager";
import { GetProduct } from "../domain/useCases/getProduct";
import { HttpProductMapper } from "./mappers/httpProduct";
import { PasswordEncoder } from "../utils/passwordEncoder";
import { ManagerLogin } from "../domain/useCases/managerLogin";
import { Paypal } from "../payments/paypal/paypalService";
import { PaypalProductMapper } from "../payments/paypal/mappers/PaypalProductMapper";
import "dotenv/config";

const idGenerator = new IdGenerator();
const managerRepository = new PrismaManagerRepository();
const createManager = new CreateManager(managerRepository, idGenerator);
const sellerRepository = new PrismaSellerRepository();
const addSeller = new AddSeller(managerRepository, sellerRepository, idGenerator);
const getManager = new GetManager(managerRepository);
const productRepository = new PrismaProductRepository();
const addProduct = new AddProduct(managerRepository, productRepository, idGenerator);
const saleRepository = new PrismaSaleRepository();
const addSale = new AddSale(managerRepository, saleRepository, idGenerator);
const getProduct = new GetProduct(productRepository);
const passwordEncoder = new PasswordEncoder();
const managerLogin = new ManagerLogin(managerRepository, passwordEncoder);

const router = Router();

router.get("/", (req, res) => {
    return res.send("Hello");
})

router.get("/sale/:product_id", (req, res) => {
    const { product_id } = req.params;
    return res.send(product_id);
})

router.post("/manager", encryptPassword, async (req, res) => {
    if (!req.body.email || !req.body.name || !req.body.password ){
        res.status(400).json({
            message: "Bad request"
        })
        return
    }
    try {
        const { manager } = await createManager.execute({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        });

        if (manager) {
            return res.status(201).end();
        }
    } catch(err: any){
        res.json({
            error: err.message
        })
        return
    }

    return res.status(400).json({ error: "It was not possible to create a manager" });
})

router.post("/manager/login", async (req, res) => {
   try {
    const { manager } = await managerLogin.execute({
        email: req.body.email,
        password: req.body.password,
    });

    return res.json(HttpManagerMapper.toHttp(manager));

   } catch(err: any){
       return res.status(401).json({ error: err.message });
   } 
})

router.post("/seller", encryptPassword, async (req, res) => {
    const { seller } = await addSeller.execute({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        managerId: req.body.managerId,
    });

    if (seller) {
        return res.status(201).json(seller);
    }

    return res.status(400).json({ error: "It was not possible to create a seller" });
})

router.post("/product", async (req, res) => {
    const { product } = await addProduct.execute({
        managerId: req.body.managerId,
        name: req.body.name,
        price: req.body.price,
    })

    if (product) {
        return res.json(product);
    }

    return res.status(404).json({ error: "It was not possible to find the manager" });
})

router.get("/product/:productId", async (req, res) => {
    try {
        const { product } = await getProduct.execute({
            productId: req.params.productId
        })


        return res.json(HttpProductMapper.toHttp(product));
    } catch {
        return res.status(404).json({ error: "Product not found" });
    }

})

router.post("/sale", async (req, res) => {
    const { sale } = await addSale.execute({
        managerId: req.body.managerId,
        sellerId: req.body.sellerId,
        productId: req.body.productId,
    })

    if (sale) {
        return res.json(sale);
    }

    return res.status(500).json({ error: "Something went wrong" });
})

router.get("/manager/:id", async (req, res) => {
    const { manager } = await getManager.execute({
        id: req.params.id,
    })

    if (manager) {
        return res.json(HttpManagerMapper.toHttp(manager));
    }

    return res.status(404).json({ error: "It was not possible to find the manager" });
})

router.get("/seller/:id", (req, res) => {
    return res.json("Hello");
})


router.post("/:manager_id/product", (req, res) => {

})

router.post("/new-order", async (req, res)=>{
    const payment = new Paypal();

    const response = await payment.createOrder(req.body);

    res.json(response);
})

router.post("/:productId/new-order", async (req, res)=>{
    const { productId } = req.params;
    console.log("PID: ", productId);
    const { product } = await getProduct.execute({ productId });
    const orderInfo = PaypalProductMapper.toPaypal(product);
    const payment = new Paypal();

    const response = await payment.createOrder(orderInfo);

    res.json(response);
    return;
})


router.post("/web", async (req, res)=>{
    console.log(req.body);
    console.log(req.body.resource.purchase_units)
    return "AAAA";
})

export const routes = router;