var express = require("express");
var app = express();
var request = require("request");
var cities = require('./cities');

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

app.get("/", function(req, res){
   console.log("index page");
   res.render("index");
});

app.get("/results", function(req, res){
    var query = req.query.city;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=8f046bdc3838e6b489a20d5225eba357";

  console.log(url);
  request(url, function(error, response, body){
    if(error){
      console.log(error);
      return ;
    } else
    // (!error && response.statusCode == 200)
    {
            var ob = JSON.parse(body);
            console.log(typeof(ob));
            var weather = JSON.stringify(ob);
            console.log(weather);
            res.render("nr", {data: ob});
            console.log(ob.name);
        }
    });
});



app.listen(8000, () => {
  console.log("SiD server started");
});
//
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("weather webapp has started!!!");
// });
