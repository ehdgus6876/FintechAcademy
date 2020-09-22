var fs = require('fs');

console.log('첫번째 기능입니다.');
fs.readFile('example2/test.txt','utf8',function (err,result){
    if(err){
        console.log(err);
        throw err;
    }
    else {
        console.error("두번째 기능입니다.");
        console.log(result);
    }
});
console.log('마지막 기능입니다.');