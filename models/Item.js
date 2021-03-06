const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    message: {
        type: "String"
    },
    offer: {
        type: Number,
        required:true
    }
 });

const itemSchema = new Schema({
   title: {
         type: String,
         required:true,
         trim:true
    },
    description: {
        type: String,
        required:true,
    },
    price:{
    type: Number,
    min: 1,
    required:true
    },
    //  image:{
    //     type: String, 
    //     default: "No Photo"
    // },
    //tie items to a specific user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   message: [messageSchema],
});

module.exports = mongoose.model('Item', itemSchema);