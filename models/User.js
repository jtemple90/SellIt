const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
       type: String,
       required:true
    },
    email: {
        type:String
    },
    displayName: {
        type: String,
        required:true
    },
    firstName: {
        type: String,
        required:true
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
    

module.exports = mongoose.model('User', userSchema);
