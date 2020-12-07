import Express, {Application}from 'express';
import Helmet from 'helmet';
import Cors from 'cors';
import Mongoose from 'mongoose';    
import dotenv from 'dotenv';
import Auth from './routes/authRouter';
import Transact from './routes/transactionRouter';

const {config} = dotenv;
config();

const server: Application = Express();

// parses response to json 
server.use(Express.json());
server.use(Cors());
server.use(Helmet());

server.use(Auth);
server.use(Transact);

//establish connection to databse 
// const DB_CONNECTION = "mongodb://root:rootpassword@0.0.0.0:27017"
const DB_CONNECTION = "mongodb://localhost:27017/payme"
// const DB_CONNECTION = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.ya0of.mongodb.net/cluster0?retryWrites=true&w=majority`;

Mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true },(error) => {
    if(error){
        console.log(error);
        console.log("Failed to connect to MongaDb");
    } else {
        console.log("conected to db");
    }
});

// send if server is up 
server.get('/', (req,res) => {
    res.send("Server is running ");
});

export default server;