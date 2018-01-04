 
var path=require('path');
var pug = require('pug');



var service={};

service.getHTML=function(fileName,values){

    console.log(values);
    var filePath=path.join(__dirname,'../../server/email-template/',fileName);
    const compiledFunction = pug.compileFile(filePath);
    return compiledFunction(values);
}



module.exports=service;