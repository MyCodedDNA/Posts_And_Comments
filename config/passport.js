const passport=require("passport");
const local=require("passport-local").Strategy;
const user=require("../models/user");

passport.use(new local(
    {usernameField:"email"},
    function(email,password,done)
    {
        user.findOne({email:email,password:password},function(err,found){
            if(err)
            {
                console.log("error in findind");
                return done(err);
            }
            else if(!found)
            {
                return done(null,false);
            }
            else{
                return done(null,found);
            }
        });
    }
));

passport.serializeUser(function(user,done){
   done(null,user.id); 
});

passport.deserializeUser(function(id,done){
    user.findById(id,function(err,found){
        if(err)
        {
            console.log("err in finding id");
            return done(err);
        }
        else if(!found)
        {
            return done(null,false);
        }
        else{
            done(null,found);
        }
    })
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated())
    {
       return  next();
    }
    else{
        res.redirect("/login");
    }

}

module.exports=passport;