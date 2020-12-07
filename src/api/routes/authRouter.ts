import {createUser, login, decryptSecret} from '../controllers/auth';
import {verifyUser} from '../middleware/verifyUser';
import Express from 'express';


const Router = Express.Router();

Router.post('/register',createUser);
Router.get('/login', verifyUser,login)
Router.get('/decrypt', decryptSecret);


export default Router;