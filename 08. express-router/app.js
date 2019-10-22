var express = require('express')
var path = require('path') 
var app = express()

//Acces static files
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.use('/user' , require('./Routes/users.js'))
app.use('/community' , require('./Routes/community.js'))

app.listen(3225)