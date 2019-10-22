var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function(request,response)
{
	var pathname = url.parse(request.url).pathname;
	if(request.method=="GET")
	{
		if(pathname=='/')
		{
			fs.readFile('index.html',function(err,data){
				response.writeHead(200,{'Content-Type':'text/html'});
				response.write(data);
				response.end();
			});
		}
		else if(pathname=='/style.css')
		{
			fs.readFile('style.css',function(err,data){
				response.writeHead(200,{'Content-Type':'text/css'});
				response.write(data);
				response.end();
			});
		}
		else if(pathname=='/script.js')
		{
			fs.readFile('script.js',function(err,data){
				response.writeHead(200,{'Content-Type':'text/javascript'});
				response.write(data);
				response.end();
			});
		}
		else if(pathname=='/tasks')
		{
			fs.readFile('tasks',function(err,contents)
			{
				response.writeHead(200,{'Content-Type':'application/json'});
				response.write(contents);
				response.end();
			});
		}
	}
	else if(request.method=="POST")
	{
		if(pathname=='/tasks')
		{
			var body='';
			var tasks = [];
			request.on('data',function(chunks)
						{
							body+=chunks.toString();
						});
			request.on('end',function()
						{
							fs.readFile('tasks',function(err,contents)
											{
												if(contents.length == 0)
												{
													tasks=[];
													//console.log(0);
													//console.log(contents.toString());
												}
												else
												{
													//console.log(contents.toString());
													tasks=contents.toString();
													tasks=JSON.parse(tasks);
													//console.log(tasks.length);
												}
												tasks.push(body);
												tasks=JSON.stringify(tasks);
												fs.writeFile('tasks',tasks,function(error)
																			{
																				if(error)
																					throw(error);
																			});
											});
							response.end();
						});
		}
		else	
			response.end();
	}
	else
		response.end();
}).listen(8080);
	