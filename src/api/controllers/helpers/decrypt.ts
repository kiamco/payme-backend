import { AES, enc} from 'crypto-js';
import User from '../../models/userModel';

const decrypt = async (email:String, password:any) => {
    try{
        //get user with find 
        const user:any = await User.find({
            email:email
        });

        // decrypt secret
        const stellarSecret:any = AES.decrypt(user[0].stellarSeed,password);
        return stellarSecret.toString(enc.Utf8);


    } catch(e) {
        return ({
            message:'server error',
            err:e 
        });
    };
};

export default decrypt;