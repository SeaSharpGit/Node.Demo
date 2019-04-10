const http=require('http');
const url=require('url');
const path=require('path');
const process=require('process');
const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false});
const mime=require('mime-types');
const cluster=require('cluster');
const cpuCount=require('os').cpus().length;

const myExpress=require('./myExpress');
const route=require('./route');

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

if(cluster.isMaster){
	console.log("master start...");
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
	cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}else{

	process.on('uncaughtException',error=>{
		console.log('未捕获的异常：'+error.toString());
	});
	
	var express=myExpress();
	//body解析
	express.use(urlencodedParser);
	
	//mime放入head中
	express.use((req,res,next)=>{
		var pathName=url.parse(req.url,true).pathname;
		var mimeType=mime.lookup(pathName);
		res.setHeader('content-type',mimeType);
		next();
	});
	
	//静态文件夹
	express.use(express.static(path.join(__dirname,'public')));
	
	//模版
	express.set('views',path.join(__dirname,'views'));
	
	//中间件
	express.use((req,res,next)=>{
		console.log(process.pid);
		console.log('middleService');
		next();
	});
	
	//测试
	express.use('/helloworld',(req,res,next)=>{
		res.send('helloworld');
	});
	
	//模版引擎
	express.use('/login',(req,res,next)=>{
		res.render('login.html',
		{
			username:'王海',
			password:'123456'
		});
	});

	express.use((req,res)=>{
		var pathname=url.parse(req.url).pathname.replace(/\//,'');
		try{
			route[pathname](req,res);
		}catch(error){
			res.send(404,'Not Found');
		}
	})
	
	http.createServer(express).listen(3000);
}


