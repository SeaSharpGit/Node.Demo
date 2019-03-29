const url=require('url');
const path=require('path');
const fs=require('fs');

function myExpress(){
    var tasks=[];
    var app=(request,response)=>{
        if(request.url!='/favicon.ico'){
            extRequest(request);
            extResponse(response);
            var i=0;
            function next(){
                var task=tasks[i++];
                if(!task){
                    return;
                }
                if(task.route===null || url.parse(request.url,true).pathname===task.route){
                    task.middleService(request,response,next);
                }else{
                    next();
                }
            };
            next();
        }
    };

    app.use=(route,middleService)=>{
        if(typeof route==='function'){
            middleService=route;
            route=null;
        }
        tasks.push(
        {
            route:route,
            middleService:middleService
        });
    }

    app.static=dir=>{
        return (req,res,next)=>{
            var pathName=url.parse(req.url,true).pathname;
            var filePath=path.join(__dirname,dir,pathName);
            fs.readFile(filePath,'binary',(error,data)=>{
                if(error){
                    console.log(error);
                    next();
                }else{
                    res.writeHead(200,'OK');
                    res.write(data,'binary');
                    res.end();
                }
            });
        
        };
    }

    return app;
}

function extRequest(request){
    request.query=url.parse(request.url,true).query;
}
function extResponse(response){
    response.send=function(data){
        if(typeof data==='string'){
            response.end(data);
        }else if(typeof data==='object'){
            response.end(JSON.stringify(data));
        }else if(typeof data==='number'){
            if(typeof arguments[1]=='undefined'){
                response.end(data.toString());
            }else{
                try{
                    response.writeHead(data,arguments[1]);
                    response.end();
                }catch(ex){
                    var x=1;
                }
                
            }
        }else{
            response.end('未处理情况');
        }
    };
}

module.exports=myExpress;