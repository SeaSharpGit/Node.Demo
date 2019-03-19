var fs=require('fs');
var mysqlPools=require('../models/mysqlPool');
var pool=new mysqlPools().getPool();

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
    mysqlOpen:function(){
        connection.connect(function(error){
            if(error){
                console.log(error);
            }else{
                console.log('MySql连接成功');
            }
        });
    },
    mysqlClose:function(){
        connection.end(function(error){
            if(error){
                console.log(error);
            }else{
                console.log('MySql断开成功');
            }
        })
    },
    mysqlRun:function(){
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
    },
    mysqlPoolRun:function(){
        var sql='select * from User';
        pool.getConnection(function(error,connect){
            connect.query(sql,null,function(error,rs){
                if(error){
                    console.log(error);
                }else{
                    for (let index = 0; index < rs.length; index++) {
                        const element = rs[index];
                        console.log(element.UserID+'_'+element.UserName+'_'+element.Date);
                    }
                }
                connect.release();
            });
        });
    }

}