import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import "dotenv/config"
import dbConnect  from "./config/dbConfig.js"
import userRouter from "./routers/authRoutes.js"

const port=process.env.PORT ||4000
const app=express()
dbConnect()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.use('/api/v1/auth',userRouter)

app.listen(port,()=>{
    console.log(`server runninon port ${port}`);
})