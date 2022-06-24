const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://xyz123:fvyosiRBHs3PQDvg@cluster0.77f4z4w.mongodb.net/?retryWrites=true&w=majority');
console.log("Connected to mongodb");
const Schema = mongoose.Schema;


const Book = new Schema({
    bookId: Number,
    name: String,
    author: String,
    genre: String,
    price: String,
    availability: Number,
    rating: Number,
    image : String 
})

const booklist = mongoose.model('book',Book);
module.exports = booklist;