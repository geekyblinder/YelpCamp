//AUTH ROUTES
const express=require("express");
const router=express.Router();
const passport=require("passport");
const User=require("../models/user");


router.get("/",(req,res)=>{
    res.render("landing");
});

router.get("/register",(req,res)=>{
    res.render("register");
})
router.post("/register",(req,res)=>{
    const newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}  
    ),function(req,res){

});

router.get("/logout",(req,res)=>{
    req.logout(function(err){
        if(err)
        console.log(err);
    });
    req.flash("success","Successfully logged you out!");
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;