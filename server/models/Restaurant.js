const mongoose=require("mongoose");
module.exports=mongoose.model("Restaurant",new mongoose.Schema({name:{type:String,required:true},description:String,image:String,cuisine:String,address:String,rating:{type:Number,default:4.5},deliveryFee:{type:Number,default:150},owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},isOpen:{type:Boolean,default:true}},{timestamps:true}));
