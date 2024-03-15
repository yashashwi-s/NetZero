const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const _=require("lodash");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
    res.render("home");
});

app.get("/about",function(req,res)
{
    res.render("about");
});

app.get("/why",function(req,res)
{
    res.render("why")
});

app.listen(3000,function()
{
    console.log("Server Started on port on 3000");
});
