var fs=require('fs');
module.exports={
    readFileSync:function(path){
        var data=fs.readFileSync(path,'utf-8');
        return data;
    },
    readFileAsync:function(path,callback){
        fs.readFile(path,function(err,data){
            if(err){
                console.log(err);
            }else{
                callback(data);
            }
        });
    },
    writeFileSync:function(path,data){
        fs.writeFileSync(path,data);
    },
    writeFileAsync:function(path,data,callback){
        fs.writeFile(path,data,function(err){
            if(err){
                console.log(err);
            }else{
                callback();
            }
        });
    },
}