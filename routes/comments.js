const express=require("express");
const router=express.Router({mergeParams:true});
const Campground=require("../models/campground");
const Comment=require("../models/comment");
const middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        console.log(err);
        else{
            res.render("comments/new",{campground:campground});
        }
    });
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
        console.log(err);
        redirect("/campgrounds");}
        else{
            //create new comment
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                     //connect new comment
                     comment.author.id=req.user._id;
                     comment.author.username=req.user.username;
                     comment.save();
                    campground.comments.push(comment);
                    
                    campground.save();
                    //redirect
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    });
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
    
});

router.put("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err)
        res.redirect("back");
        else
        res.redirect("/campgrounds/"+req.params.id);
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        res.redirect("back");
        else
        res.redirect("/campgrounds/"+req.params.id);
    });
});




module.exports=router;