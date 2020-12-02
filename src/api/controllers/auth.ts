import Express, {Request, Response} from 'express';
import Bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { Keypair } from 'stellar-sdk';

const createUser = async ( req: Request, res: Response) => {

    //grab params from body
    const {name, email, password} = req.body;

    //hash password 
    const passwordHash = Bcrypt.hashSync(password,10);
    
    //generate stellar credentials
    const keypair = Keypair.random();

    // has stellar secret 
    const stellarSecretHash = Bcrypt.hashSync(keypair.secret(),10);

    // create user object to insert to monogodb
    const user = new User({
        name:name,
        email: email,
        password: passwordHash,
        stellarAccount: keypair.publicKey(),
        stellarSeed: stellarSecretHash
    });

    try {
        const newUser = await user.save();

        res.status(201).json({
            message: "User created",
            data: user
        });
    } catch(e) {
        console.error(e)
        res.status(500).json({
            err: e,
            message: 'server error'
        })
    }

}

export {
    createUser
}