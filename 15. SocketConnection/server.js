var express = require('express')
var app = express()

var http = require('http')
var server = http.Server(app);

const socketIO = require('socket.io');
var io = socketIO(server);

var path = require('path')
var port = 3000

var counter=0;

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'Public'))); // To serve static files
//ByDefault serve /public/index.html 


io.on('connection', function(socket){				//socket contains address of variable
	++counter;
	if(counter>=3)
	{
		socket.disconnect();
		--counter;
	}
  socket.on('chat message', function(msg){			
    socket.broadcast.emit('chat message', msg); //Sends packet to all others except sender
    //socket.emit('chat message', msg);	//Sends packet only to one who sends request		
    //io.emit('chat message', msg);		//Sends packet to all
    
  });
  console.log("Connection Established");
  // setTimeout(()=>{
  // socket.emit('chat message', "abc");
  // socket.emit('chat message', "def");
  // socket.emit('chat message', "ghi");
  // socket.emit('chat message', "jkl");},3000);
  	socket.on('disconnect',function(){
		console.log("Disconnected");
		--counter;
	});

});
  
server.listen(port , ()=>{console.log(`Listening on Port ${port}`)})