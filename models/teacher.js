const user=require('./person');
function teacher(id,name,age){
    user.apply(this,[id,name,age]);
    this.teach=function(){
        console.log('teacher.teach');
    };
}
module.exports=teacher;