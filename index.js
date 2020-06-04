const express=require("express");
const port=8000;
const app=express();
const layout=require("express-ejs-layouts");
const routes=require("./routes/home");

app.set("view engine","ejs");
app.set("views","views");
app.set("layout extractScripts",true);
app.set("layout extractStyles",true);


app.use(layout);
app.use(express.static('./static'))
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