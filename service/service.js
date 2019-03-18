var fs=require('fs');
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sa123456',
    database:'Test',
    port:'3306'
});

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
    },
    mySqlOpen:function(){
        connection.connect(function(error){
            if(error){
                console.log(error);
            }else{
                console.log('MySql连接成功');
            }
        });
    },
    mySqlClose:function(){
        connection.end(function(error){
            if(error){
                console.log(error);
            }else{
                console.log('MySql断开成功');
            }
        })
    },
    mySqlRun:function(){
        var sql='select * from User';
        connection.query(sql,null,function(error,rs){
            if(error){
                console.log(error);
            }else{
                for (let index = 0; index < rs.length; index++) {
                    const element = rs[index];
                    console.log(element.UserID+'_'+element.UserName+'_'+element.Date);
                }
            }
        })

    }

}