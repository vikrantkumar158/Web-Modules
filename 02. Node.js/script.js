(function(window,document,undefined)
{
	var task=document.getElementById('task');
	var taskt=document.getElementById('tasktrigger');
	var list=document.getElementById('list');
	var req=new XMLHttpRequest();
	req.addEventListener('load',function(){
		if(req.status==200)
		{
			var loadtask=JSON.parse(req.responseText);
			for(var i=0;i<loadtask.length;++i)
			{
				var li=document.createElement('li');
				li.innerHTML=loadtask[i];
				list.appendChild(li);
			}
		}
	});
	req.open("GET","/tasks");
	req.send();
	taskt.onclick=function()
				{
					var request=new XMLHttpRequest();
					if(task.value)
					{
						request.addEventListener('load',function(){
							if(request.status==200)
							{
								var li=document.createElement('li');
								li.innerHTML=task.value;
								task.value='';
								list.appendChild(li);
							
							}
						});
						request.open("POST","/tasks");
						request.send(task.value);
					}
					else
					{
						alert("Enter some text");
						task.focus();
					}
				}
})(this,this.document);