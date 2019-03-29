const http=require('http');
const url=require('url');
const process=require('process');
const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false});
const mime=require('mime-types');

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

var listener=myExpress();
//body解析
listener.use(urlencodedParser);

//mime放入head中
listener.use((req,res,next)=>{
	var pathName=url.parse(req.url,true).pathname;
	var mimeType=mime.lookup(pathName);
	res.setHeader('content-type',mimeType);
	next();
});

//静态文件夹
listener.use(listener.static('public'));
listener.use(listener.static('views'));

//中间件1
listener.use((req,res,next)=>{
	console.log('middleService');
	next();
});

listener.use('/helloworld',(req,res,next)=>{
	res.send('helloworld');
});

listener.use((req,res)=>{
	res.send(404,'Not Found');
});

http.createServer(listener).listen(3000);
