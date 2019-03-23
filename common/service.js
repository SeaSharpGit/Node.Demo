const fs=require('fs');
const mysqlService=require('../models/mysqlService');
const mysqlModel=new mysqlService();
const mysqlPool=require('../models/mysqlPool');
const mysqlPoolModel=new mysqlPool();
const pool=mysqlPoolModel.getPool();
const events=require('events');

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
        mysqlModel.mysqlOpen();
        mysqlModel.mysqlRun();
        mysqlModel.mysqlClose();
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
    },
    event:function(){
        var eventEmitter=new events.EventEmitter();
        eventEmitter.once('showName',(name1,name2)=>
            console.log(name1+name2)
        );
        eventEmitter.emit('showName','王','海');

    }

}