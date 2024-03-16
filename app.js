const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

var t = 0;

mongoose.connect('mongodb+srv://Yashashwi:yashashwi@cluster0.qo8vdvd.mongodb.net/profileDB');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'views')));
// Set view engine as EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, ''));
app.use('/form', express.static(__dirname + '/index.html'));

app.get("/", function(req, res) {
    res.render("home");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.set('trust proxy', 1);

app.use(session({
    secret: 'foo',
    resave: false, // Add this line to explicitly set resave to false
    saveUninitialized: true, // Add this line to explicitly set saveUninitialized to true
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Yashashwi:yashashwi@cluster0.qo8vdvd.mongodb.net/profileDB' }) // Use MongoDB as session store
}));

app.use(function(req, res, next) {
    if (!req.session) {
        return next(new Error('Oh no')) // Handle error
    }
    next(); // Otherwise continue
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB!");
});

module.exports = db;

const calculateDataSchema = new mongoose.Schema({
    id: String,
    footPrint: String,
    datae: Number,
    datac: Number,
    travel: Number,
    dataf: Number
});

const CalculateData = mongoose.model('CalculateData', calculateDataSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"]
     },
    mobno: {
        type: Number,
        match: /^\d{10}$/, // This regex matches exactly 10 digits
        required: [true, 'Mobile number is required'],
        unique: true,
    },
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        unique: true
     },
     email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
     },
     password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
     },
     confirmPassword: String,
     calculateData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CalculateData'
    }
});

const User = mongoose.model("User", userSchema);


app.get("/signup",function(req,res)
{
    res.render("signup");
});

app.get("/login",function(req,res)
{
    res.render("login");
});
app.post("/",function(req,res){
    res.render("home");
})

app.get("/industries",function(req,res)
{
    res.render("industries")
})


app.post("/signup", async function (req, res) {
    const { name, mobno, username, email, password, confirmPassword } = req.body;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.render("signup", { error: "Passwords do not match" });
    }
    
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        name,
        mobno,
        username,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.redirect("/login"); // Redirect to login page after signup
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
});

var user;

app.post("/login", async function (req, res) {
    const { loginUsername, loginPassword } = req.body;

    try {
        // Find the user by username
        user = await User.findOne({ username: loginUsername });

        console.log(user);
        console.log(loginUsername);
        // Check if user exists
        if (!user) {
            console.log("User not found");
            return res.render("login", { error: "Invalid username or password" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(loginPassword, user.password);

        if (isPasswordMatch) {
            // Passwords match, user authenticated successfully
            // Redirect the user to a dashboard or another page upon successful login
            t=1;
            console.log("User authenticated successfully");
            res.redirect("/calculator");
        } else {
            // Passwords do not match
            console.log("Invalid password");
            return res.render("login", { error: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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


app.get("/faq",function(req,res)
{
    res.render("faq");
});

app.get("/calculator",function(req,res)
{
    res.render("calculator");
});
app.post("/calculator",async function(req,res){
    
    
    var numpeople = req.body.numpeople;
    var electricity=req.body.electricity;
    var cylinders= req.body.cylinders;
    var flights = req.body.flights;
    var vehicle= req.body.vehicle;
    var mileage =req.body.mileage;
    var newspaper= req.body.newspaper;
    var aluminium = req.body.aluminium;
    var bus= req.body.bus;
    var train = req.body.train;
    
    
    var electricityprint= (electricity*0.82)/numpeople;
    var cylinderprint = (cylinders*23.5)/numpeople;
    var petrol= vehicle/mileage;
    var petrolprint= (petrol*2.3)/numpeople;
    var flightprint= (flights*242)/numpeople;
    var busprint = (bus*0.1)/numpeople;
    var trainprint = (train*0.27)/numpeople;
    var foodprint=0;
    if(req.body.meatLover==="re")
    foodprint=foodprint+108;
    else if(req.body.omnivore==="re")
    foodprint=foodprint+83;
    else if(req.body.vegetarian==="re")
    foodprint=foodprint+55;
    else if(req.body.vegan==="re")
    foodprint=foodprint+46;
    var footprint = (electricityprint+cylinderprint+petrolprint+flightprint+foodprint+busprint+trainprint);
    console.log(footprint)
    percentages=[((electricityprint/footprint))*100,((cylinderprint/footprint)*100),(((petrolprint+flightprint+trainprint+busprint)/footprint))*100,((foodprint/footprint)*100)];
    
    if(newspaper=== undefined)
    footprint=footprint+89/numpeople;
    if(aluminium=== undefined)
    footprint=footprint+75/numpeople;
    let area=footprint/2750;
    area=area*2.471;
    area=Math.round(area);
    var indiaResult ;
    var indiaResultSub;
    
   footprint=Math.round(footprint)
    if(footprint>580)
    {
        indiaResult="OH NO!! You are beyond the Cusp"
        indiaResultSub="Your Emission levels exceed India's average by"+" "+Math.floor((footprint)/5.80)+"%"
    }
    else if(footprint<=580)
    {
        indiaResult="Great! Keep it UP"
        indiaResultSub="Your Emission levels are below India's average by"+" "+Math.floor((580-footprint)/5.80)+"%"
    }
    if (t) {
        try {
            // Find the corresponding CalculateData document for the user
            let calculateData = await CalculateData.findOne({ user: user._id });
    
            // If CalculateData document doesn't exist, create a new one
            if (!calculateData) {
                calculateData = new CalculateData({
                    user: user._id,
                    footPrint: footprint,
                    datae: (electricityprint / footprint) * 100,
                    datac: (cylinderprint / footprint) * 100,
                    travel: ((petrolprint + flightprint + trainprint + busprint) / footprint) * 100,
                    dataf: (foodprint / footprint) * 100
                });
    
                // Save the new CalculateData document
                await calculateData.save();
            }
    
            // Update user with calculateData reference
            user.calculateData = calculateData._id;
    
            // Save user
            await user.save();
        } catch (error) {
            // Handle error appropriately
            console.error('Error updating calculateData:', error);
            // Return or throw the error, or handle it in another way
        }
    }
    
    
    

    res.render("result",{footprint:footprint,percentages:percentages,indiaResult:indiaResult,indiaResultSub:indiaResultSub,area:area})
});
app.get("/vision",function(req,res)
{
    res.render("vision");
});

app.get("/offset",function(req,res)
{
    res.render("offset");
});

app.post("")

app.listen(3000,function()
{
    console.log("Server Started on port on 3000");
});