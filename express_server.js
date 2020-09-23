const express = require('express')
const app = express()
const path = require('path');
 
app.set("views",__dirname + "/views"); //ejs를 사용하기위한 디렉토리 설정
app.set("view engine","ejs") //ejs를 사용하기 위한 뷰 엔진

app.use(express.json()); // JSON 타입의 데이터를 받기위한 설정
app.use(express.urlencoded({extended:false})); //urlencoded의 데이터를 받기위한 설정

app.use(express.static(path.join(__dirname, 'public')));//to use static asset
//to use static asset 디자인 파일 위치를 정의

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/designTest",function (req,res){
  res.render("designTest");
})
app.get('/hello', function(req,res){
    res.send("Hello 2");
});

// #work6 다양한 라우터를 추가해보세요
app.get("/user",function(req,res){
    res.send("user Data");
});

app.get('/ejsTest',function(req,res){
  res.render('test');
});

app.post('/getDataTest',function (req, res){
  var userText = req.body.userText;
  console.log(userText);
  res.json("입력값은 : " + userText);
});

app.listen(3000)