import { errorHandler } from "../utils/error";
import bcryptjs from 'bcryptjs'
import User from '../models/user.models.js'

export const user = (req, res)=> {
    res.json({"message": "User Fetched!!"}) 
};

// update user

export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id){
        // return res.status(401).json("You are not authorized to update this account!!");
        return next(errorHandler(401,"You are not authorized to update this account!!"));
    }
    try {
        if (req.body.password) {
            req.body.password = await bcryptjs.has(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            }, {new: true}
        );
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    }catch(err){
        next(err)
    }
}