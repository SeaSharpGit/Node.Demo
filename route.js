const service=require('./common/service');
const fs=require('fs');
const url=require('url');
const querystring=require('querystring');
const async=require('async');
const teacher=require('./models/teacher');

module.exports={
    objectTest:(request,response)=>{
        tea=new teacher(2,'王海的老师',50);
		tea.say();
		tea.teach();
        response.end();
    },
    login:(request,response)=>{
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./views/login.html','binary',(error,file)=>{
            if(error){
                console.log(error);
            }else{
                response.write(file,'binary');
            }
            response.end();
        });
    },
    loginGet:(request,response)=>{
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        var query=url.parse(request.url,true).query;
        response.write('账号：'+query.username+'\n\r','utf-8');
        response.write('密码：'+query.password,'utf-8');
        response.end();
    },
    loginPost:(request,response)=>{
        var msg='';
        request.on('data',data=>{
            msg+=data;
        }).on('end',()=>{
            msg=querystring.parse(msg);
            response.writeHead(200, {'Content-Type':'text/text;charset=utf-8'});
            response.write('账号：'+msg.username+'\n\r','utf-8');
            response.write('密码：'+msg.password,'utf-8');
            response.end();
        });
    },
    wirteFile:(request,response)=>{
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        
        //绝对路径
        //var path=path.resolve('./','views','login.html');
        //相对路径
        //var path2=path.join('./','views','login.html');
        
        service.writeFileAsync('./test.txt','写文件',()=>{
            response.write('写文件成功');
            response.end();
        });
    },
    showImage:(request,response)=>{
        response.writeHead(200, {'Content-Type':'image/png'});
        service.readFileAsync('./images/study.png',file=>{
            response.write(file,'binary');
            response.end();
        });
    },
    //向文件追加文本
    appendFile:(request,response)=>{
        //没有文件会创建文件
        fs.appendFileSync('./test.txt','同步追加',{encoding:'utf-8'});
        fs.appendFile('./test.txt','异步追加',{encoding:'utf-8'},error=>{
            if(error){
                console.log('appendFile失败'+error.toString());
            }else{
                console.log('appendFile成功');
            }
            response.end();
        });
    },
    //读取文件
    readFile:(request,response)=>{
        fs.readFileSync('./test.txt','utf-8');
        fs.readFileSync('./images/study.png','binary');
        fs.readFile('./test.text',(error,data)=>{
            if(error){
                console.log('readFile失败'+error.toString());
            }else{
                console.log('readFile成功');
            }
            response.end();
        });
    },
    //写文件
    writeFile:(request,response)=>{
        //没有文件会创建文件，有文件会覆盖
        fs.writeFileSync('./test.txt','同步写文件',{encoding:'utf-8'});
        fs.writeFile('./test.txt','异步写文件',{encoding:'utf-8'},error=>{
            if(error){
                console.log('writeFile失败'+error.toString());
            }else{
                console.log('writeFile成功');
            }
            response.end();
        });
    },
    //打开文件
    openFile:(request,response)=>{
        var fd=fs.openSync('./test.txt','r');
        fs.open('./test.txt','r',(error,fd)=>{
            if(error){
                console.log('openFile失败'+error.toString());
            }else{
                console.log('openFile成功');
            }
            response.end();
        });
    },
    //新建文件夹
    mkdir:(request,response)=>{
        //如果文件夹已存在会报错
        fs.mkdirSync('./newFolder');
        fs.mkdir('./newFolder',error=>{
            if(error){
                console.log('mkdir失败'+error.toString());
            }else{
                console.log('mkdir成功');
            }
            response.end();
        });
    },
    //读取文件夹
    readdir:(request,response)=>{
        fs.readdirSync('./');
        fs.readdir('./',(error,files)=>{
            if(error){
                console.log('readdir失败'+error.toString());
            }else{
                console.log('readdir成功');
            }
            response.end();
        });
    },
    //删除文件夹
    rmdir:(request,response)=>{
        //如果文件夹中有内容会报错
        fs.rmdirSync('./newFolder');
        fs.rmdir('./newFolder',error=>{
            if(error){
                console.log('rmdir失败'+error.toString());
            }else{
                console.log('rmdir成功');
            }
            response.end();
        });
    },
    //删除文件
    unlinkFile:(request,response)=>{
        fs.unlinkSync('./test.txt');
        fs.unlink('./test.txt',error=>{
            if(error){
                console.log('unlink失败'+error.toString());
            }else{
                console.log('unlink成功');
            }
            response.end();
        });
    },
    //文件重命名
    renameFile:(request,response)=>{
        fs.renameSync('./test.txt','./test2.txt');
        fs.rename('./test.txt','./test2.txt',error=>{
            if(error){
                console.log('rename失败'+error.toString());
            }else{
                console.log('rename成功');
            }
            response.end();
        })
    },
    //文件监听
    watchFile:(request,response)=>{
        //检测文件的每一个变化
        fs.watch('./test.txt',(event,fileName)=>{
            console.log(event,fileName);
        });
        //检测文件名的变化
        fs.watchFile('./test.txt',(current,prev)=>{
            console.log(current,prev);
        });
    },
    //串行 串行等待 并行
    async:(request,response)=>{
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        //串行
        async.series({
            one:done=>{
                done(null,'one完毕');
            },
            two:done=>{
                done(null,'two完毕');
            }
        },(error,rs)=>{
            if(error){
                console.log('错误：'+error);
            }else{
                console.log(rs);
            }
        });
        //串行等待
        async.waterfall([
            done=>{
                done(null,'one完毕')
            },
            (preValue,done)=>{
                console.log(preValue);
                done(null,'two完毕');
            }
        ],(error,rs)=>{
            if(error){
                console.log('错误：'+error);
            }else{
                console.log(rs);
            }
        });
        //并行
        async.parallel({
            one:done=>{
                done(null,'one完毕');
            },
            two:done=>{
                done(null,'two完毕');
            }
        },(error,rs)=>{
            if(error){
                console.log('错误：'+error);
            }else{
                console.log(rs);
            }
        });
        response.end();
    },


    mysql:function(request,response){
        service.mysqlRun();
        response.end();
    },
    mysqlPool:function(request,response){
        service.mysqlPoolRun();
        response.end();
    },
    event:function(request,response){
        service.event();
        response.end();
    },




}