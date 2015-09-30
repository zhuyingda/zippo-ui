function ieConsole(){
    if(!console){
        console.log = function(){};
        console.warn= function(){};
        console.error=function(){};
    }
}

module.exports = ieConsole;