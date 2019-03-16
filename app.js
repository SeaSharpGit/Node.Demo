var http=require('http');
var url=require('url');
var route=require('./route')

var service=require('./service/service.js');
var user=require('./models/person');
var teacher=require('./models/teacher');

http.createServer(function(request,response){
	//防止执行2次
	if(request.url!='/favicon.ico'){
		
		tea=new teacher(2,'王海的老师',50);
		tea.say();
		tea.teach();

		var pathname=url.parse(request.url).pathname.replace(/\//,'');
		route[pathname](request,response);
		
	}
}).listen(8888);