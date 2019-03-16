var service=require('./service/service');
module.exports={
    login:function(request,response){
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        service.readFileAsync('./views/login.html',function(data){
            response.write(data);
            response.end('');
        });
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