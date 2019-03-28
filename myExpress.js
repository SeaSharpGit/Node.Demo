const url=require('url');
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

    return app;
}

function extRequest(request){
    request.query=url.parse(request.url,true).query;
}
function extResponse(response){
    response.send=data=>{
        if(typeof data==='string'){
            response.end(data);
        }else if(typeof data==='object'){
            response.end(JSON.stringify(data));
        }else if(typeof data==='number'){
            response.end(data);
        }
    };
}

module.exports=myExpress;