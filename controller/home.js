const user=require("../models/user")

module.exports.home=function(req,res){
    res.locals.title="Home";
    res.render("home");
}

module.exports.login=function(req,res){
    if(req.isAuthenticated())
    {
        res.redirect("/home/profile");
    }
    else
    {
    res.locals.title="Login";
    res.render("login");}
}

module.exports.register=function(req,res){
    if(req.isAuthenticated())
    {
        res.redirect("/home/profile");
    }
    else
    {
    res.locals.title="Register";
    res.render("register");
    }
}

module.exports.action_login=function(req,res){
    res.redirect("/home/profile");
}

module.exports.action_register=function(req,res){
   
    if(req.body.password=req.body.confirm_password)
    {
        
        user.create(req.body,function(err,created){
            if(err)
            {
                console.log("err in creating user");
                return ;
            }else{
                user.create(req.body);
                res.redirect("/login");
            }
        });
        
    }
    else
    {
        res.redirect("back");
    };
}