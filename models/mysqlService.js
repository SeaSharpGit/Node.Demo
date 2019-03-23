const mysql=require('mysql');

function mysqlService(){
    var connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'sa123456',
        database:'Test',
        port:'3306'
    });

    this.mysqlOpen=function(){
        connection.connect(function(error){
            if(error){
                console.log(error);
            }else{
                console.log('MySql连接成功');
            }
        });
    };
    this.mysqlClose=function(){
        connection.end(function(error){
            if(error){
                console.log(error);
            }else{
                console.log('MySql断开成功');
            }
        })
    };
    this.mysqlRun=function(){
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
    };
};

module.exports=mysqlService;