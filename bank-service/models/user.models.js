import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    profilePicture:{
        type: String,
        default:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile.png&f=1&nofb=1&ipt=04ef65619b79ae1aa77f1add50da6a6117bcd5425b2ba7b4a6f076cfc8c5c773&ipo=images'
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;