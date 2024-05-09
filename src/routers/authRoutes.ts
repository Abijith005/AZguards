import express from "express"
import { userLogin, userRegister } from "../controllers/authController"

const router=express.Router()

router.post('/userRegister',userRegister)

router.post('/userLogin',userLogin)
export default router