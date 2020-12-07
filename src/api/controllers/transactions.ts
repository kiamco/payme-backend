import Express, {Request, Response} from 'express';
import { Networks, Operation, Server, TransactionBuilder, BASE_FEE, Asset, Keypair} from 'stellar-sdk';
import decrypt from './helpers/decrypt';

//init stellar server

const server = new Server(`${process.env.STELLAR_SERVER}`);



const sendPayment = async (req: Request, res: Response) => {
    const {destinationId, originId, amount, email, password} = req.body;

    // create transaction
    try {
        const sourceAccount = await server.loadAccount(originId)
        let transaction = new TransactionBuilder(sourceAccount,{
            timebounds: await server.fetchTimebounds(100),
            networkPassphrase: Networks.TESTNET,
            fee: BASE_FEE,
          }).addOperation(Operation.payment({
            destination: destinationId,
            asset: Asset.native(),
            amount: amount
          })).build();

        //TODO: decrypt secret from user
        const secret = await decrypt(email,password);
        // sign transaction
        transaction.sign(Keypair.fromSecret(secret));

        //send to stellar server
        const result = server.submitTransaction(transaction);

        // return response
        res.status(201).json({
            message:'succesful transaction'
        });

    } catch (e) {
        console.error(e)
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