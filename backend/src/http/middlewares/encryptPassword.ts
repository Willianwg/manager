import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";

export function encryptPassword(req: Request, res: Response, next: NextFunction){
    if (!req.body.password ){
        res.status(400).json({
            message: "Bad request"
        })
        return
    }
    const { password } = req.body;
    const encrypted = bcrypt.hashSync(password, 10);

    req.body.password = encrypted;

    next();
}