import Express, {Request, Response} from 'express';
import Bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { Keypair, Networks, Operation, Server, TransactionBuilder } from 'stellar-sdk';
import Axios from 'axios';
import { AES, enc} from 'crypto-js';

const provisionFundsTestNet = async (keypair: any) => {
    try{
        const res = await Axios.get(`https://friendbot.stellar.org?addr=${keypair.publicKey()}`);
    } catch(e) {
        console.error(e);
    };
};


const createUser = async ( req: Request, res: Response) => {

    //grab params from body
    const {name, email, password} = req.body;

    //hash password 
    const passwordHash = Bcrypt.hashSync(password,10);
    
    //generate stellar credentials
    const keypair = Keypair.random();

    // encrypt stellar secret
    const stellarSecretHash = AES.encrypt(
        keypair.secret(),
        password
    ).toString();

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
        provisionFundsTestNet(keypair);

        res.status(201).json({
            message: "User created",
            data: user
        });
    } catch(e) {
        console.error(e)
        res.status(500).json({
            err: e,
            message: 'server error'
        });
    };

};

const login = async (req: Request,res: Response) => {
    const {email,token, name, stellarAccount} = req.body;

    try {   

        const account = await checkBalance(stellarAccount);
        
        res.status(201).json({
            message:'user logged in',
            data: {
                email,
                token,
                name, 
                stellarAccount,
                accountInfo: account.balances
            }
        });
    } catch(e) {
        res.status(500).json({
            message:'server error',
            err:e
        });
    };
};

const decryptSecret = async(req:Request, res:Response) => {
    const {email,password} = req.body;

    try{
        //get user with find 
        const user:any = await User.find({
            email:email
        });

        // decrypt secret
        const stellarSecret:any = AES.decrypt(user[0].stellarSeed,password);
        
        res.status(201).json({
            message:'decrypted secret',
            stellarSecret: stellarSecret.toString(enc.Utf8)
        });

    } catch(e) {
        res.status(500).json({
            message:'server error',
            err:e 
        });
    };
    

};

const checkBalance = async (publicKey: any) => {
    const server = new Server(`${process.env.STELLAR_SERVER}`);

    const account = await server.loadAccount(publicKey);

    return account;
}

export {
    createUser,
    login,
    decryptSecret
};