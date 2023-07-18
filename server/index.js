import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js"
import { kpis, transactions } from "./data/data.js"
import transactionRoutes from "./routes/transaction.js"
import Transaction from "./models/Transaction.js"

dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

// Routes
app.use("/kpi",kpiRoutes)
app.use("/transaction",transactionRoutes)

const PORT = process.env.PORT || 9000;

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(async ()=> {
        app.listen(PORT,() => console.log(`Server Connected at Port: ${PORT}`))


        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis)
        // Transaction.insertMany(transactions)
    
    })
    .catch((error) => console.log(`${error} did not Connect`))