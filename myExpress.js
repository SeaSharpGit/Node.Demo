const url=require('url');
const path=require('path');
const fs=require('fs');
const ejs=require('ejs');

function myExpress(){
    var tasks=[];
    var listener=(request,response)=>{
        if(request.url!='/favicon.ico'){
            //扩展方法
            extQuery(request);
            extSend(response);
            extRender(request,response,listener);

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

    listener.use=(route,middleService)=>{
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

    listener.static=dir=>{
        return (req,res,next)=>{
            var pathName=url.parse(req.url,true).pathname;
            var filePath=path.join(dir,pathName);
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

    listener.sets={};
    listener.set=(key,value)=>{
        listener.sets[key]=value;
    };
    listener.get=key=>{
        return listener.sets[key];
    };

    return listener;
}

function extQuery(request){
    request.query=url.parse(request.url,true).query;
}
function extSend(response){
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

function extRender(request,response,listener){
    response.render=(dir,parameters)=>{
        var fullPath=path.join(listener.get('views'),dir);
        ejs.renderFile(fullPath,parameters,{},(error,data)=>{
            if(error){
                response.writeHead(503,error);
            }else{
                response.setHeader('content-type','text/html');
                response.writeHead(200,'OK');
                response.write(data);
            }
            response.end();
        })
    };
}

module.exports=myExpress;