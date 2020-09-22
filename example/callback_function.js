var fs = require('fs');

function callbackFunc(callback){
    fs.readFile('example2/test.txt','utf8',function (err,result){
        if(err){
            console.log(err);
            throw err;
        }
        else {
            console.error("B");
            callback(result);
        }
    });
}

console.log('A');
callbackFunc(function (data){
    console.log(data);
    console.log("C");
})

// promise, async await callback hell 공부!