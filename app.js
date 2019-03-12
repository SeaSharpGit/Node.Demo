var http=require('http');
var service=require('./service/service.js');
var user=require('./models/person');
var teacher=require('./models/teacher');

http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	//防止执行2次
	if(request.url!='/favicon.ico'){
		service.funciton2(response);
		service.funciton3(response);
		tea=new teacher(2,'王海的老师',50);
		tea.say();
		tea.teach();

		response.end('');
	}
}).listen(8888);