var express = require('express')
var path = require('path')
var app = express()
var port = 3000


//Connect with db
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB'; // myDB is database name

mongoose.connect(mongoDB);

mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});

var user = mongoose.Schema({
    name: String , age : Number , hobbies : []
});

var client = mongoose.Schema({
    handleBy: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    name: String
});

var UserModel = mongoose.model('Users', user);
var ClientModel = mongoose.model('Clients', client);

let newUser = new UserModel({
    name: 'Hardik' , age : 20 , hobbies : ['a' , 'b' , 'c']
  })
  newUser.save()
   .then(data => {
     console.log(data)
     
     let client = new ClientModel({
         name : 'John' , handleBy : mongoose.Types.ObjectId(""+data._id)
     })
     return client.save()
   })
   .then( dataC =>{
        console.log("----------")
        console.log(dataC)
   })
   .catch(err => {
     console.error(err)
   })


//Get Populated Values
app.get('/products',function(req,res){
    ClientModel.findOne().populate('handleBy').exec(function(err, c) {
        if (err) { return console.log(err); }
    
        console.log(c);
        res.send(c)
    });
    
})


app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})
