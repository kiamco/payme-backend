
import Mongoose, {Schema, Document} from 'mongoose';

const UserSchema:Schema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true

    },
    password: {
        type: String,
        required:true
    },
    stellarAccount: {
        type: String,
        required: true
    },
    stellarSeed: {
        type:String,
        required: true
    }
}, {
    timestamps: true
});

const User = Mongoose.model('User', UserSchema);

export default User