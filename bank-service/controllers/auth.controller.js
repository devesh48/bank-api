import User from '../models/user.models.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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


export const signIn = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const validUser = await User.findOne({ email: email});
        if (!validUser){
            return next(errorHandler(401, 'Invalid Email Credentials'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword){
            return next(errorHandler(401, "incorrect password"));
        }
        const expiryDate = new Date( Date.now() + 36000000);
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        const {password: hashedPwd, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
    } catch (err) {
        next(err);
    }
};