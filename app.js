const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const apiKey = process.env.OPENWEATHER_API_KEY;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

const query = req.body.city;
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const weatherDescriptionText = "<p>The weather is currently " + weatherDescription + "</p>";
        const tempDescription = "<h1>The temperature in "+ query +" is " + temp + " degrees Celcius</h1>";
        const image ="<image src='http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png'>";
        res.write(weatherDescriptionText);
        res.write(tempDescription);
        res.write(image);
        res.send();
});
});
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});