import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'

import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

configDotenv();

mongoose.connect(process.env.Mongo).then(() => {
    console.log("Connected to the database!!");
}).catch((err) => {
    console.log(err);
});
const app = express();
app.use(express.json());

app.listen(3002, () => {
    console.log('Server is listening on port 3002!')
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);