import {createUser, login, decryptSecret} from '../controllers/auth';
import {verifyUser} from '../middleware/verifyUser';
import Express from 'express';


const Router = Express.Router();

Router.post('/register',createUser);
Router.post('/login', verifyUser,login)
Router.post('/decrypt', decryptSecret);


export default Router;