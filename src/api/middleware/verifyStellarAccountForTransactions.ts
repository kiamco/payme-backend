import {Request, Response, NextFunction} from 'express';
import { Server,NotFoundError } from 'stellar-sdk';
import { brotliDecompressSync } from 'zlib';

const server = new Server(`${process.env.STELLAR_SERVER}`);


export const verifyStellarAccountForTransactions = async (req: Request, res:Response, next:NextFunction) => {

        const {destinationId, originId} = req.body;

        // validate origin of transaction 
        try {
            const destination = await server.loadAccount(destinationId);
            const origin = await  server.loadAccount(originId);
            req.body = {...req.body, origin}
            next();
        } catch (e) {
    
            if (e instanceof NotFoundError){
                res.status(401).json({
                    message:'invlaid origin/destination'
                })
            } else {
                return e;
            };
        };
    
 
};