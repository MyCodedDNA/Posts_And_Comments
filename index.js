const express=require("express");
const port=8000;
const app=express();
const layout=require("express-ejs-layouts");
const routes=require("./routes/home");
const db=require("./config/database");
const session=require("express-session");
const mongostore=require("connect-mongo")(session);
const passport=require("passport");
const passportConfig=require("./config/passport");

app.set("view engine","ejs");
app.set("views","views");
app.set("layout extractScripts",true);
app.set("layout extractStyles",true);

app.use(express.urlencoded());
app.use(session({
    name:"PostsAndCommenst",
    secret:'Posts',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(60*1000*100)
    },
    store:new mongostore(
        {
            mongooseConnection:db,
            autoRemove:false
        }
    )
    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(layout);
app.use(express.static('./static'))
app.use(function(req,res,next){
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
})
app.use("/",routes);

app.listen(port,function(err){
    if(err)
    {
        console.log("error while listening");
        return ;
    }
    else
    {
        console.log("server is up and running");
    }
});