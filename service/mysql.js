var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sa123456',
    database:'Test',
    port:'3306'
});

module.exports={
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
    }
}