var http=require('http');
var url=require('url');
var route=require('./route')

var user=require('./models/person');
var teacher=require('./models/teacher');

http.createServer(function(request,response){
	//防止执行2次
	if(request.url!='/favicon.ico'){
		tea=new teacher(2,'王海的老师',50);
		tea.say();
		tea.teach();

		var pathname=url.parse(request.url).pathname.replace(/\//,'');
		try{
			route[pathname](request,response);
		}catch(error){
			response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
			response.write(error.toString());
            response.end('');
		}
		
		
	}
}).listen(8888);