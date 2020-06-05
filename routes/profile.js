const expres=require("express");
const routes=expres.Router();
const controller=require("../controller/profile");
const passport=require("../config/passport");

routes.get("/profile",passport.checkAuthentication,controller.profile);
routes.post("/post",passport.checkAuthentication,controller.post);
routes.get("/delete_post",passport.checkAuthentication,controller.delete_post);
routes.post("/comment",passport.checkAuthentication,controller.comment);
routes.get("/delete_comment",passport.checkAuthentication,controller.delete_comment);
module.exports=routes;