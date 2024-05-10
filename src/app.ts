import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import "dotenv/config"
import dbConnect  from "./config/dbConfig"
import userAuthRouter from "./routers/authRoutes"
import todosRouter from "./routers/todosRoutes"
import authMiddleware from "./middlewares/authMiddleware"

const port=process.env.PORT ||4000
const app=express()
dbConnect()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
 
app.use('/api/v1/auth',userAuthRouter) 
app.use('/api/v1/tasks',todosRouter)

app.listen(port,()=>{ 
    console.log(`server runninon port ${port}`);
})  