import {createUser} from '../controllers/auth';
import Express from 'express';

const Router = Express.Router();

Router.post('/register',createUser);


export default Router;