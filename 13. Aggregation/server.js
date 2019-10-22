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
    name: String , age : Number , marks : []
});

var UserModel = mongoose.model('Users', user);

let newUser = new UserModel({
    name: 'Hardik' , age : 20 , marks : [50 , 70 , 72]
  })
  newUser.save()
   .then(data => {
     console.log(data)
   })
   .catch(err => {
     console.error(err)
   })
/* 1. Add extra field in result
{$addFields :
    { totalMarks  :
        { $sum : "$marks"}
        }

}
*/

/* 
2. 
$group
$count
$limit
$match
$skip
$sort
$lookup
*/

//Get aggregation Result
app.get('/aggregateAddField',function(req,res){
    UserModel.aggregate( [ {$addFields :
                                { totalMarks  :
                                    { $sum : "$marks"}
                                 }
                            
                            } ]).exec(function(err, c) {
        if (err) { return console.log(err); }
    
        console.log(c);
        res.send(c)
    });
    
})


app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})
