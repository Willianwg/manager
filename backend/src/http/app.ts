import express, { Request } from "express";
import { routes } from "./routes";
import cors from "cors";

const app = express();
app.use(cors<Request>());
app.use(express.json());
app.use(routes);

export { app };