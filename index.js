const path=require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const bodyparser = require('body-parser');
// const bodyparser = require('body-parser');
const Book = require('./src/model/BookModel');
const User = require('./src/model/UserModel');


const app = new express;
app.use(express.static('./dist/front-end'))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());
// app.use(bodyparser.json());



app.get('/api/books', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    Book.find()
        .then(function(book){
            res.send(book);
        })
})

app.get('/api/:id', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    const id = req.params.id;
    console.log(id);
    Book.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})
 
app.put('/api/update', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.body);
    var id=req.body._id;
    var bookId=req.body.bookId;
    var name=req.body.name;
    var author=req.body.author;
    var genre=req.body.genre;
    var price=req.body.price;
    var availability=req.body.availability;
    var rating=req.body.rating;
    var image=req.body.image;
    Book.findByIdAndUpdate(id,
                           {$set:{"bookId":bookId,
                             "name":name,
                             "author":author,
                             "genre":genre,
                             "price":price,
                             "availability":availability,
                             "rating":rating,
                             "image":image }})
    .then(function(){
        res.send();
    })           
    
})

app.post('/api/insert', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.body);
    var books = {
        bookId : req.body.item.bookId,
        name : req.body.item.name,
        author : req.body.item.author,
        genre : req.body.item.genre,
        price : req.body.item.price,
        availability : req.body.item.availability,
        rating : req.body.item.rating,
        image : req.body.item.image
    }

    var book = new Book(books);
    book.save();
})

app.delete('/api/remove/:id', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    
    
    console.log(req.params.id);
    Book.findByIdAndDelete(req.params.id)
    .then(()=>{
        console.log("Success");
        
        res.send();
    })
})

app.post('/api/register', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let userData = req.body;
    console.log(userData);
    let user = new User(userData);
    user.save((error, registeredUser)=>{
        if(error){
        console.log(error)
    } else {
        let payload={subject:registeredUser._id};
        let token = jwt.sign(payload,'secretKey');
        res.status(200).send({token});
    }
    })
})

app.post('/api/login', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let userData = req.body;
    console.log(userData);
    User.findOne({username:userData.username},{password:userData.password})
    .exec(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            if (!user) {
                console.log("No user");
                res.status(401).send('Invalid username');
            // } else
            // if (user.password !== userData.password) {
            //     console.log("No match");
            //     res.status(401).send('Invalid password');
            } else {
            if (user.password === userData.password) {
                console.log("Match");
                let payload = {subject:user._id};
                let token= jwt.sign(payload,'secretKey');
                res.status(200).send({token});
            }
            else{
                console.log("No match");
                res.status(401).send('Invalid password');
            }
        }
        }
    })
        
    
})

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + './dist/front-end/index.html'));
});

app.listen(3000,()=>{
    console.log("Server up in port 3000");
});
