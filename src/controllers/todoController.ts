import { Request, Response } from "express";

export const smaple=(req:Request,res:Response)=>{
    console.log('hellowwwwwwwwwwwwwwwwwwww');
    res.json({suc:true})
    
}