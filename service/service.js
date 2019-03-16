var fs=require('fs');
module.exports={
    readFileSync:function(path){
        var data=fs.readFileSync(path,'utf-8');
        return data;
    },
    readFileAsync:function(path,callback){
        fs.readFile(path,function(error,data){
            if(error){
                console.log(error);
            }else{
                callback(data);
            }
        });
    },
    writeFileSync:function(path,data){
        fs.writeFileSync(path,data);
    },
    writeFileAsync:function(path,data,callback){
        fs.writeFile(path,data,function(error){
            if(error){
                console.log(error);
            }else{
                callback();
            }
        });
    },
    readFileAsync:function(path,callback){
        fs.readFile(path,'binary',function(error,file){
            if(error){
                console.log(error);
            }else{
                callback(file);
            }
        });
    }

}