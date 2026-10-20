const mongoose=require("mongoose");
module.exports=mongoose.model("MenuItem",new mongoose.Schema({restaurant:{type:mongoose.Schema.Types.ObjectId,ref:"Restaurant",required:true},name:{type:String,required:true},description:String,price:{type:Number,required:true},image:String,category:String,available:{type:Boolean,default:true}},{timestamps:true}));
