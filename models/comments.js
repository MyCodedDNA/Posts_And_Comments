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
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }
});
const comments=mongoose.model("comments",schema);
module.exports=comments;