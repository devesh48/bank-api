import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv();
mongoose.connect(process.env.Mongo).then(() => {
    console.log("Connected to the database!!");
}).catch((err) => {
    console.log(err);
});
const app = express();

app.listen(3002, () => {
    console.log('Server is listening on port 3002!')
});