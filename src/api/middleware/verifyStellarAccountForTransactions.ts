import {Request, Response, NextFunction} from 'express';
import { Server,NotFoundError } from 'stellar-sdk';

const server = new Server(`${process.env.STELLAR_SERVER}`);


export const verifyStellarAccountForTransactions = (req: Request, res:Response, next:NextFunction) => {

        const {destinationId, originId} = req.body;

        // validate origin of transaction 
        try {
            const destination = server.loadAccount(destinationId);
            const origin =  server.loadAccount(originId);
            next();
        } catch (e) {
    
            if (e instanceof NotFoundError){
                throw new Error("The destination account does not exist");
            } else {
                return e;
            };
        };
    
 
};