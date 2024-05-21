import User from '../models/user.models.js'
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        const hashedPwd = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username: username, email: email, password: hashedPwd });
        await newUser.save();
        res.status(202).send({ "message": "data posted successfully" });
    } catch (err) {
        // res.status(500).send({ "message": "username or email already present in the database" });
        res.status(500).send(err.message);
    }
};