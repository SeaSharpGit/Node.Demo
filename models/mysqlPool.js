var mysql=require('mysql');

function mysqlPool(){
    this.flag=false;
    this.pool=mysql.createPool({
        host:'localhost',
        user:'root',
        password:'sa123456',
        database:'Test',
        port:'3306'
    });

    this.getPool=function(){
        if(!this.flag){
            this.pool.on('connection',function(connection){
                this.flag=true;
            });
        }
        return this.pool;
    };
}
module.exports=mysqlPool;