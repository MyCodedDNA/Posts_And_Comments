const expres=require("express");
const routes=expres.Router();
const controller=require("../controller/home");

routes.get("/",controller.home);
routes.use("/home",require("./profile"));
module.exports=routes;