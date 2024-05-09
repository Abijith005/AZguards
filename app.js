import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import "dotenv/config"

const port=process.env.PORT ||4000
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.listen(port,()=>{
    console.log(`server runninon port ${port}`);
})