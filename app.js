const http=require('http');
const url=require('url');
const process=require('process');

const route=require('./route');
const myExpress=require('./myExpress');

process.on('uncaughtException',e=>{
	console.log('未捕获的异常：'+e.toString());
});

// var app=http.createServer((request,response)=>{
// 	//防止执行2次
// 	if(request.url!='/favicon.ico'){
// 		var pathname=url.parse(request.url).pathname.replace(/\//,'');
// 		try{
// 			route[pathname](request,response);
// 		}catch(error){
// 			response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
// 			response.write(error.toString());
// 			response.end();
// 		}
// 	}
// });

var app2=myExpress();
app2.use((req,res,next)=>{
	console.log('middleService1');
	next();
});
app2.use((req,res,next)=>{
	console.log('middleService2');
	next();
});
app2.use('/test',(req,res,next)=>{
	console.log('test');
});

http.createServer(app2).listen(3000);
