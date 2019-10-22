var express = require('express');
var app = express();
//var bodyParser =  require('body-parser');
var fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var server = app.listen(8080,function()
{});
app.get('/',function(req,res)
{
	res.sendFile(__dirname+'/index.html');
});
app.get('/style.css',function(req,res)
{
	res.sendFile(__dirname+'/style.css');
});
app.get('/script.js',function(req,res)
{
	res.sendFile(__dirname+'/script.js');
});
app.get('/tasks',function(req,res)
{
	res.sendFile(__dirname+'/tasks');
});
app.post('/tasks',function(req,res)
{
	var b=req.body;
	console.log(b);
	var tasks=[];
	fs.readFile(__dirname+'/tasks',function(err,contents)
	{
		if(contents.length != 0)
		{
			tasks=contents.toString();
			tasks=JSON.parse(tasks);
		}
		tasks.push(b);
		tasks=JSON.stringify(tasks);
		fs.writeFile('tasks',tasks,function(err)
		{
			if(err)
				throw err;
		});
		res.sendFile(__dirname+'/tasks');
	});
});