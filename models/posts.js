const mongoose=require("mongoose");
const schema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments'
    }]
});
const posts=mongoose.model("posts",schema);
module.exports=posts;