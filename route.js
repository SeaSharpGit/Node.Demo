var service=require('./service/service');
var url=require('url');
var querystring=require('querystring');
module.exports={
    loginGet:function(request,response){
        var query=url.parse(request.url,true).query;
        var username=query['username'];
        var password=query['password'];
        if(username!=undefined){
            console.log(username);
        }
        if(password!=undefined){
            console.log(password);
        }
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        service.readFileAsync('./views/login.html',function(data){
            response.write(data);
            response.end('');
        });
    },
    loginPost:function(request,response){
        var msg='';
        request.on('data',function(data){
            msg+=data;
        });
        request.on('end',function(){
            msg=querystring.parse(msg);
            response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
            response.write('UserName='+msg["username"]+'\n');
            response.write('Password='+msg["password"]);
            response.end('');
        });
        var a='';
        
        
    },
    logout:function(request,response){
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        service.readFileAsync('./views/logout.html',function(data){
            response.write(data);
            response.end('');
        });
    },
    wirteFile:function(request,response){
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        service.writeFileAsync('./test.txt','写文件',function(){
            response.write('写文件成功');
            response.end('');
        });
    },
    showImage:function(request,response){
        response.writeHead(200, {'Content-Type':'image/png'});
        service.readFileAsync('./images/study.png',function(file){
            response.write(file,'binary');
            response.end('');
        });
    }


}