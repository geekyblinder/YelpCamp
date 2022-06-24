const express=require("express");
const router=express.Router();
const Campground=require("../models/campground");
const middleware=require("../middleware");
router.get("/",(req,res)=>{

    Campground.find({},function(err,allCampgrounds){
        if(err)
        console.log(err);
        else
        res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
    });

});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,image:image,description:desc,author:author};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else
        res.redirect("/campgrounds");
    });
   
});
router.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
  })
router.get("/:id",(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(foundCampground);
        res.render("campgrounds/show",{campground:foundCampground});
    }
    });

});
// EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
        Campground.findById(req.params.id,function(err,foundCampground){
                    res.render("campgrounds/edit",{campground:foundCampground});
        });
    
});

router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err)
        res.redirect("/campgrounds");
        else
        res.redirect("/campgrounds/"+req.params.id);
    });
});

router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        res.redirect("/campgrounds");
        else
        res.redirect("/campgrounds");
    });
});

//middleware



module.exports=router;
