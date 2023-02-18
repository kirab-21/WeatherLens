const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    const loc = req.body.cityName;
    const apiKey = "7e7fc165a38d0f79a223e2b2f6bd05kb"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weather = JSON.parse(data)
            const temp = weather.main.temp
            const des = weather.weather[0].description
            const icon = weather.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write("<p>The weather is currently "+des + "<p>");
            res.write("<h1>The Temperature in "+loc+" is "+ temp + " degree Celcius <\h1>");
            res.write("<img src="+imageURL+">")
            res.send()
        })
    })
})



app.listen(3000,function(){
    console.log("Server is running on server");
});
