const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://xyz123:fvyosiRBHs3PQDvg@cluster0.77f4z4w.mongodb.net/?retryWrites=true&w=majority');
console.log("Connected to mongodb");
const Schema = mongoose.Schema;


const User = new Schema({
    username:String,
    email:String,
    mobile:Number,
    password:String
})
const user = mongoose.model('users',User);
module.exports=user;