import Express, {Request, Response} from 'express';
import { Keypair, Networks, Operation, Server, TransactionBuilder,NotFoundError, BASE_FEE, Asset} from 'stellar-sdk';

//init stellar server

const server = new Server(`${process.env.STELLAR_SERVER}`);

const sendPayment = async (req: Request, res: Response) => {
    const {destinationId, originAccount, amount} = req.body;

    // create transaction
    try {
        const transaction = new TransactionBuilder(originAccount,{
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.payment({
            destination: destinationId,
            asset:Asset.native(),
            amount:amount
        })
        )
        .setTimeout(180)
        .build()

        // sign transaction
        transaction.sign(originAccount);

        //send to stellar server
        const result = server.submitTransaction(transaction);

        // return response
        res.status(201).json({
            message:'succesful transaction',
            result
        });

    } catch (e) {
        res.status(500).json({
            message: 'server error',
            err: e
        });
    };

};

const viewTransactions = async (req: Request, res: Response) => {

    const {accountId} = req.body;

    try {
        const payments = await server.payments().forAccount(accountId);

        res.status(200).json({
            message: 'successfull',
            payments
        });
    } catch(e) {
        res.status(500).json({
            message:' server error',
            err: e
        });
    };
};

export {
    sendPayment,
    viewTransactions
};