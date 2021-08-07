const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true})); //first install body-parser in the hyper terminal

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const city=req.body.cityName;
    const appkey="65a452924467c06b73ae4c74f4a735f7";
    const unit="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appkey+"&units="+unit;
    https.get(url,function(response){                  //get data for the particular location
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The weather is currently "+desc+"</h1>");
            res.write("<h1>The temperature in "+city+" is "+temp+" degree Celcius</h1>");
            res.write("<img src="+imgurl+">");
        });
    });
});


app.listen(3000,function(){
    console.log("server is running on port 3000");
});
