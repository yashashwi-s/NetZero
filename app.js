const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const _=require("lodash");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

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
    res.render("why");
});

app.get("/sendEmail",function(req,res)
{
    res.render("sendEmail");
})

app.get("/signup",function(req,res)
{
    res.render("signup");
});

app.get("/faq",function(req,res)
{
    res.render("faq");
});

app.get("/vision",function(req,res)
{
    res.render("vision");
});

app.post("")

app.listen(3000,function()
{
    console.log("Server Started on port on 3000");
});
