import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

configDotenv();

mongoose.connect(process.env.Mongo).then(() => {
    console.log("Connected to the database!!");
}).catch((err) => {
    console.log(err);
});

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/bank-project/build')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'bank-project', 'build', 'index.html'));
})

// Apply CORS middleware
app.use(cors());

// Use JSON parsing middleware
app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
});

app.listen(3002, () => {
    console.log('Server is listening on port 3002!')
});