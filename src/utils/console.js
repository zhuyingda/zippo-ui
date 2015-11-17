function ieConsole(){
    if(window.console == undefined){
        window.console= {
            log: function(){},
            warn: function () {},
            error: function(){}
        }
    }
}

module.exports = ieConsole;
