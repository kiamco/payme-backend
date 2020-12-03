import {Request, Response,NextFunction} from 'express';
import JWT from 'jsonwebtoken';
import Secrets from '../config/secrets';
import User from '../models/userModel';
import Bcrypt from 'bcryptjs';
import {Document} from 'mongoose';

function genToken(email: String, _id: String ) {

    // create the payload...
    const payload = {
        email,
        _id  
    };

    const options = {
        expiresIn: '1h'
    };

    const token = JWT.sign(payload, Secrets.jwtSecret, options);

    return token;
}

export const verifyUser = async (req: Request, res:Response, next:NextFunction) => {
    const {email, _id, password} = req.body;
    // const token = genToken(email, _id);

    try {

        //find user
        const user:any = await User.find({
            email: email
        });

        // if user exists generate token and attach to req else return 401
        if (user.length > 0) {
            if (user && Bcrypt.compareSync(password, user[0].password)) {
                const token = genToken(user[0].email, user[0]._id);
                req.body = {...req.body, token:token, stellarAccount:user[0].stellarAccount};
                next();
            }
        } else {
            res.status(404).json({
                message: 'user/password is wrong',
            });
        };

    } catch(e){
        res.status(500).json({
            message: 'auth middleware error',
        });
    };


}