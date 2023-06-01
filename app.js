const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
const query=req.body.cityName;
const apikey="d9a0537f8bd608c3292f58461cac5e99";
const unit="metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apikey+ "&units=" +unit;
https.get(url,function(response){
    // console.log(response.statusCode);
        response.on("data",function(data){
        const weather_data= JSON.parse(data);
    const temp=weather_data.main.temp;
    const hum=weather_data.main.humidity;
    const descrp=weather_data.weather[0].description;
    const icon=weather_data.weather[0].icon;
    const imageURL="https://openweathermap.org/img/wn/" + icon +"@2x.png";
    res.write("<p><h2> <strong>The weather is currently " +descrp+ "<strong> </h2><p>");
    res.write("<h1> The temperature of " + query +" is " + temp + " degrees celsius.</h1>");
    res.write("<img src=" + imageURL +">");
    res.send();
})
    }
);

})


app.listen(3000,function(){
    console.log("server running on port 3000");
});
