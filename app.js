const http=require('http');
const url=require('url');
const process=require('process');


const route=require('./route');
const myExpress=require('./myExpress');

process.on('uncaughtException',error=>{
	console.log('未捕获的异常：'+error.toString());
});

// var app=(request,response)=>{
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
// };

var app=myExpress();

app.use(app.static('public'));
app.use(app.static('views'));

app.use((req,res,next)=>{
	console.log('middleService1');
	next();
});
app.use((req,res,next)=>{
	console.log('middleService2');
	next();
});
app.use('/helloworld',(req,res,next)=>{
	res.send('helloworld');
});

app.use((req,res)=>{
	res.send(404,'Not Found');
});

http.createServer(app).listen(3000);
