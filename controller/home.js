module.exports.home=function(req,res){
    res.locals.title="Home";
    res.render("home");
}

module.exports.login=function(req,res){
    res.locals.title="Login";
    res.render("login");
}

module.exports.register=function(req,res){
    res.locals.title="Register";
    res.render("register");
}