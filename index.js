const express=require("express");
const port=8000;
const app=express();
const layout=require("express-ejs-layouts");
const routes=require("./routes/home");

app.set("view engine","ejs");
app.set("views","views");
app.set("extractScripts",true);
app.set("extractStyles",true);

app.use("/",routes);
app.use(layout);
app.use(express.static('./static'))


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