import Server from './api/server';


const port = process.env.PORT || 5000;

// listen to server 
Server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));