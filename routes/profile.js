const expres=require("express");
const routes=expres.Router();
const controller=require("../controller/profile");

routes.get("/profile",controller.profile);
module.exports=routes;