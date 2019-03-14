var service=require('./service/service');
module.exports={
    login:function(request,response){
        service.readFileAsync('./views/login.html',function(data){
            response.write(data);
            response.end('');
        });
    },
    logout:function(request,response){
        service.readFileAsync('./views/logout.html',function(data){
            response.write(data);
            response.end('');
        });
    },
    wirteFile:function(request,response){
        service.writeFileAsync('./test.txt','写文件',function(){
            response.write('写文件成功');
            response.end('');
        });
    }

}