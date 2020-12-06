import Express from 'express';
import {sendPayment, viewTransactions} from '../controllers/transactions';
import {verifyStellarAccountForTransactions} from '../middleware/verifyStellarAccountForTransactions';
 
const Router = Express.Router();

Router.post('/transact',verifyStellarAccountForTransactions,sendPayment);
Router.get('/viewTransactions', viewTransactions);

export default Router;