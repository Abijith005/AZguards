import express from "express"
import { smaple } from "../controllers/todoController"
const router=express.Router()

router.post('/a',smaple)

export default router
