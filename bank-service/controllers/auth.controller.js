import User from '../models/user.models.js'
import bcryptjs from 'bcryptjs'
// import { errorHandler } from '../utils/error.js';

export const signUp = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        const hashedPwd = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username: username, email: email, password: hashedPwd });
        await newUser.save();
        res.status(202).send({ "message": "data posted successfully" });
    } catch (err) {
        next(err);
        // next(errorHandler(300, "something went wrong"));
        // res.status(500).send(err.message);
    }
};