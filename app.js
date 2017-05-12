var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser")

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/",function(req, res){
    res.render("search");
})

app.post("/results", function(req,res){
    var query = req.body.search;
    var url  = "http://omdbapi.com/?s=" + query;
    request(url, function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            console.log(data);
            res.render("results", {data:data});
        }
    })
});

app.post("/display", function(req,res){
    var query = req.body.title;
    console.log(query);
    var url  = "http://omdbapi.com/?i=" + query;
    request(url, function(error,response,body){
        if(!error && response.statusCode == 200){
            var info = JSON.parse(body)
            console.log(info);
            res.render("display", {info:info});
        }
    })
});

app.listen(8000, function () {
  console.log('Listening on port: 8000');
});
