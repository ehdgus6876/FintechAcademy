// NPM 초기화 명령 : npm init
// NPM package 설치 방법 : npm install [package 이름]
// request 모듈 추가 : npm install request



const request = require("request");
var parseString = require("xml2js").parseString;


request(
  "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109",
 function (error, response, body) {
  console.error("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  var xml = body;
  parseString(xml, function (err, result){
    //console.dir(result.rss.channel);
    //#work5
    var info_body = result.rss.channel;
    console.log(info_body[0].item[0].description[0].header[0].wf[0])
  });
});
