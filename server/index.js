import express from 'express';
import dotenv from "dotenv";
import connectDB from './database/dbconnect.js';
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config({});
// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 8080;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

//apis
app.use('/api/v1/user',userRouter);

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`);
})