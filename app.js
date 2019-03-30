const http=require('http');
const url=require('url');
const path=require('path');
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
listener.use(listener.static(path.join(__dirname,'public')));

//模版
listener.set('views',path.join(__dirname,'views'));

//中间件
listener.use((req,res,next)=>{
	console.log('middleService');
	next();
});

//测试
listener.use('/helloworld',(req,res,next)=>{
	res.send('helloworld');
});

//模版引擎
listener.use('/login',(req,res,next)=>{
	res.render('login.html',
	{
		username:'王海',
		password:'123456'
	});
});

//404页面
listener.use((req,res)=>{
	res.send(404,'Not Found');
});

http.createServer(listener).listen(3000);
