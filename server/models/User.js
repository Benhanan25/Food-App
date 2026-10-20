const mongoose=require("mongoose");
module.exports=mongoose.model("User",new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true},password:{type:String,required:true},role:{type:String,enum:["customer","restaurant","rider","admin"],default:"customer"},phone:String,address:String},{timestamps:true}));
