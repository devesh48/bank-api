import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(req.cookies.access_token)

    // // if (!token) return res.status(401).json("Token Expired, Please Login Again!!!");
    if (!token) return next(errorHandler(401,"Token Expired, Please Login Again!!!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // if (err) return res.status(403).json("Token is invalid!!");
        if (err) return next(errorHandler(403,"Token is invalid!!"));
        req.user = user;
        next();
    })
    // req.user=user;
    // next();
}