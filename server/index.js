import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.js";
import searchRouter from "./routes/search.js";
import historyRouter from "./routes/history.js";
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();

app.use(cookieParser())

app.use(cors())
app.use(express.json())

connectDB();

app.use('/api/auth',authRouter)
app.use('/api/search', searchRouter);
app.use('/api/history', historyRouter);

app.get("/",(req,res)=>{
    return res.status(200).json({msg:"Hello , Everything is Ok"})
})


export default app;