
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStartegy=require("passport-local");
const methodOverride=require("method-override");
const Campground=require("./models/campground");
const Comment=require("./models/comment")
const seedDB=require("./seeds");
const User=require("./models/user");

const commentRoutes=require("./routes/comments");
const campgroundRoutes=require("./routes/campgrounds");
const indexRoutes=require("./routes/index");

const app=express();



mongoose.connect("mongodb+srv://Kartech867:Manutd223@cluster0.ia1yb.mongodb.net/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();
app.use(require("express-session")({
    secret:"we will we will precursive shock you!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

let port=process.env.PORT;
if(port==null || port==""){
    port=3000;
}
app.listen(port,function(){
    console.log("Server has started!");
});