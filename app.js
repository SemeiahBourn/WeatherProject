const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
  
    const query = req.body.cityName
const apiKey= "42b9e8e335f4752032f7046e0819aff5"
const unit= "metric"
const url =
"https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey +"&units=" + unit;

https.get(url, function (response) {
console.log(response.statusCode);

response.on("data", function (data) {
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description
  const icon= weatherData.weather[0].icon
  const imageUrl= " http://openweathermap.org/img/wn/" + icon +  "@2x.png"
  res.write("<p>The weather is currently " + weatherDescription + "</p>");
  res.write("<h1>The temperature in " + query + "is " + temp + " degrees Celcius.</h1>"); 
  res.write("<img src=" + imageUrl+">")
  res.send()
});
});
})
// const query = "London"
// cpnstapiKey= "42b9e8e335f4752032f7046e0819aff5"
// const unit= "imperial"
// const url =
// "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey +"&units=" + unit;

// https.get(url, function (response) {
// console.log(response.statusCode);

// response.on("data", function (data) {
//   const weatherData = JSON.parse(data);
//   const temp = weatherData.main.temp;
//   const weatherDescription = weatherData.weather[0].description
//   const icon= weatherData.weather[0].icon
//   const imageUrl= " http://openweathermap.org/img/wn/" + icon +  "@2x.png"
//   res.write("<p>The weather is currently" + weatherDescription + "</p>");
//   res.write("<h1>The temperature in London is " + temp + "degrees Celcius.</h1>"); 
//   res.write("<img src=" + imageUrl+">")
//   res.send()
// });
// });
app.listen(3000, function () {
  console.log("Server is running on port 30000.");
});
