const http=require('http');
const url=require('url');
const route=require('./route')

http.createServer(function(request,response){
	//防止执行2次
	if(request.url!='/favicon.ico'){
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