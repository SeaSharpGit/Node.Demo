function person(id,name,age){
    this.id=id;
    this.name=name;
    this.age=age;
    this.say=function(){
        console.log('person.say');
    }
}
module.exports=person;