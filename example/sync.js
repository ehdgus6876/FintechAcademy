var fs = require('fs');

console.log('A');

var result = fs.readFileSync('example2/test.txt','utf8');

console.log(result);

console.log('C');
