const expres=require("express");
const routes=expres.Router();
const controller=require("../controller/home");
const passport=require("../config/passport");

routes.get("/",controller.home);
routes.get("/login",controller.login);
routes.get("/register",controller.register);
routes.post("/action_login",passport.authenticate(
    'local',
    {
        failureRedirect:'/login'
    }
),controller.action_login);
routes.post("/action_register",controller.action_register);
routes.use("/home",require("./profile"));
module.exports=routes;