const mongoose=require("mongoose");
const Campground=require("./models/campground");
const Comment=require("./models/comment");

const data=[{
    name:"Dard-e-Camp",
    image:"https://miro.medium.com/max/1200/1*ZwsuiM48pU22ugmPQq_5vA.jpeg",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni commodi obcaecati sequi, reiciendis, est dolores nihil accusamus, vero at autem ad ullam reprehenderit molestias aperiam fuga aut dicta molestiae aliquid debitis. Minus ex vitae laborum nisi illum voluptates eius fugiat repellendus. Assumenda obcaecati consequatur facilis atque eligendi debitis hic culpa?"
},
{
    name:"Campwale",
    image:"https://wallpaperaccess.com/full/181060.jpg",
    description:"nice place"
},
{
    name:"Camp-War",
    image:"https://wallpaperaccess.com/full/181066.jpg",
    description:"good campsite"
}
];

function seedDB(){
    //remove
    Campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err)
        //         console.log(err);
        //         else{
        //             console.log("added");
        //             Comment.create({
        //                 text:"very nic pic deer",
        //                 author:"Xavier"
        //             },function(err,comment){
        //                if(err){
        //                 console.log(err);
        //                } 
        //                else{
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("Comment made!");
        //                }
        //             });
        //         }
        //     });
        // });
    });

    //add

}

module.exports=seedDB;