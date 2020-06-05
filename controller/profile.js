const comments=require("../models/comments");
const posts=require("../models/posts");
const user=require("../models/user");

module.exports.profile=function(req,res){
    res.locals.title="profile";
    posts.find({}).populate('comments').populate({
        path:'user',

    }).exec(function(err,found){
        
        if(err)
        {
            console.log("err in finding posts");
            return ;
        }
        else 
        {
            // console.log(found[0].comments);
            res.locals.posts=found;
            return res.render("profile");
        }
    });
    
}
module.exports.post=function(req,res){
    res.locals.title="profile";
    req.body.user=req.user._id;
    posts.create(req.body,function(err,found){
        if(err)
        {
            console.log("err in creating post");
            return ;

        }
        else
        {
           return  res.redirect("back"); 
        }
    });
}

module.exports.comment=function(req,res){
    res.locals.title="profile";
    req.body.user=req.user._id;
    req.body.post=req.query.postid;
    comments.create(req.body,function(err,found){
        if(err)
        {
            console.log("err in creating comment");
            return res.redirect("back");

        }
        else
        {
            posts.findById(req.query.postid,function(err,found_post){
                if(err)
                {
                    console.log("err in finding post");
                    return res.redirect("back");

                }
                else
                {
                    found_post.comments.push(found);
                    found_post.save();
                    return  res.redirect("back"); 
                }
            })
           
        }
    });
}

module.exports.delete_post=function(req,res)
{
    
    if(req.user.id==req.query.userid)
    {
        posts.findByIdAndDelete(req.query.postid,function(err){
            if(err)
            {
                console.log("err in deleting post");
                return res.redirect("back");
            }
            else{

                comments.deleteMany({post:req.query.postid},function(err){
                    if(err)
                    {
                        console.log("err in deleting post");
                        return res.redirect("back");
                    }
                    else
                    {
                    
                        return res.redirect("back");
                    }
                })
            }
        });
    }
}

module.exports.delete_comment=function(req,res)
{
    
    if(req.user.id==req.query.userid)
    {
        let postid=
        comments.findById(req.query.commentid,function(err,found){
            if(err)
            {
                console.log("err in deleting post");
                return res.redirect("back");
            }
            else{
                posts.findByIdAndUpdate(found.post,{$pull:{comments:req.query.commentid}},function(err,post){
                    found.remove();
                    return res.redirect("back");
                });
                
            }
        });
    }
}

