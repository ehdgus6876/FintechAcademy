const express = require('express')
const app = express()
const path = require('path');
const request = require("request");
var jwt = require('jsonwebtoken');
var tokenKey = "j1234%!@@!#ekerkqkwasfk"
var auth = require('./lib/auth');

//Mysql 커넥터
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ehfhfh12',
  database : 'fintech'
});
connection.connect();


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

app.get("/signup",function (req,res){
  res.render("signup");
});

app.get("/login", function (req,res){
  res.render("login");
});


app.get("/main",function(req,res){
  res.render("main");
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

// app.get('/authText',auth, function(req,res){
//   res.json("당신은 콘텐츠 접근에 성공했습니다.");
// })

app.get("/balance", function(req,res){
  res.render("balance");
})

app.get('/qrcode',function(req,res){
  res.render("qrcode");
})

app.get("/authResult",function(req,res){
  var authCode = req.query.code;
  


  var option = {
    method: "POST",
    url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
    form: {
      code : authCode,
      client_id : "DWcVdr677L6iyPzQSfapI8TZq0yph9lDwsamr3Ya",
      client_secret : "QJ40tWSHO0Yu4LEEercg192EQ8Q7kEzdaj1khbOR",
      redirect_uri : "http://localhost:3000/authResult",
      grant_type : "authorization_code"
    //#자기 키로 시크릿 변경
    },
  };

  request(option, function(error,response,body){
    
    var accessRequestResult = JSON.parse(body); //JSON 오브젝트를 JS 오브젝트로 변경
    console.log(accessRequestResult);
    res.render("resultChild", { data: accessRequestResult });
  });

});

app.post("/signup", function (req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var userAccessToken = req.body.userAccessToken;
  var userRefreshToken = req.body.userRefreshToken;
  var userSeqNo = req.body.userSeqNo;
  console.log(userName, userEmail, userPassword);
  connection.query(
    "INSERT INTO `user`(`name`,`email`,`password`,`accesstoken`,`refreshtoken`,`userseqno`)VALUES(?,?,?,?,?,?);",
    [
      userName,
      userEmail,
      userPassword,
      userAccessToken,
      userRefreshToken,
      userSeqNo,
    ],
    function (error, results, fields) {
      if (error) throw error;
      else {
        res.json(1);
      }
    }
  );
});

app.post('/login',function (req,res){
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  console.log(userEmail, userPassword);
  connection.query("SELECT * FROM user WHERE email = ?",[userEmail],function (error, results,fields){
    if (error) throw error;
    else{
      if(results.length == 0){
        res.json(2) //아이디 존재하지 않음
      }else{
        var storedPassword = results[0].password;
        if(storedPassword == userPassword){
          //jwt token 발행하기
          jwt.sign(
            {
              userId: results[0].id,
              userEmail: results[0].email,
            },
            tokenKey,
            {
              expiresIn: "10d",
              issuer: "fintech.admin",
              subject: "user.login.info",
            },
            function (err, token) {
              console.log("로그인 성공", token);
              res.json(token);
            }
          );
        }
        else{
          res.json("로그인 실패")
        }
      }
    }

  })
})

app.post('/list',auth, function(req,res){
  var userId = req.decoded.userId;

  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [
      userId
    ],
    function (error, results) {
      if (error) throw error;
      else {
        var option = {
          method: "GET",
          url: "https://testapi.openbanking.or.kr/v2.0/user/me?user_seq_no=1100763463",
          headers: {
            Authorization : "Bearer " + results[0].accesstoken,
          },
          //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
          qs: {
            user_seq_no : results[0].userseqno,
          //#자기 키로 시크릿 변경
          },
        };
        request(option, function(err, response, body){
          var resResult = JSON.parse(body);
          res.json(resResult);
        })
      }
    }
  );

  
})

app.post('/balance',auth,function(req,res){
  var userId = req.decoded.userId;
  var countnum = Math.floor(Math.random() * 1000000000) + 1;
  
  //사용자 정보를 바탕으로 request 요청 만들기
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [
      userId
    ],
    function (error, results) {
      if (error) throw error;
      else {
        
        var option = {
          method: "GET",
          url: "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
          headers: {
            Authorization : "Bearer " + results[0].accesstoken,
          },
          //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
          qs: {
            bank_tran_id : "T991659500U" + countnum,
            fintech_use_num : req.body.fin_use_num,
            tran_dtime : "20200923163000",
          },
        };
        request(option, function(err, response, body){
          var resResult = JSON.parse(body);
          
          res.json(resResult);
        })
      }
    }
  );
});

app.post("/transactionlist",auth,function (req,res){
  var userId = req.decoded.userId;
  var countnum = Math.floor(Math.random() * 1000000000) + 1;
  
  //사용자 정보를 바탕으로 request 요청 만들기
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [
      userId
    ],
    function (error, results) {
      if (error) throw error;
      else {
        
        var option = {
          method: "GET",
          url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
          headers: {
            Authorization : "Bearer " + results[0].accesstoken,
          },
          //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
          qs: {
            bank_tran_id : "T991659500U" + countnum,
            fintech_use_num : req.body.fin_use_num,
            inquiry_type : "A",
            inquiry_base : "D",
            from_date : "20181201",
            to_date : "20190103",
            sort_order : "D",
            tran_dtime : "20200923163000",
          },
        };
        request(option, function(err, response, body){
          var resResult = JSON.parse(body);
          console.log(resResult);
          res.json(resResult);
        })
      }
    }
  );
})

app.listen(3000)