const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/hello', function(req,res){
    res.send("Hello 2");
});

// #work6 다양한 라우터를 추가해보세요
app.get("/user",function(req,res){
    res.send("user Data");
});

app.listen(3000)