const express=require("express"),Restaurant=require("../models/Restaurant"),MenuItem=require("../models/MenuItem"),{auth,role}=require("../middleware");
const router=express.Router();
router.get("/",async(req,res)=>res.json(await Restaurant.find().sort({rating:-1})));
router.get("/:id",async(req,res)=>{const restaurant=await Restaurant.findById(req.params.id);if(!restaurant)return res.status(404).json({message:"Restaurant not found"});res.json({restaurant,menu:await MenuItem.find({restaurant:restaurant._id})})});
router.post("/",auth,role("restaurant","admin"),async(req,res)=>res.status(201).json(await Restaurant.create({...req.body,owner:req.user.id})));
router.post("/:id/menu",auth,role("restaurant","admin"),async(req,res)=>res.status(201).json(await MenuItem.create({...req.body,restaurant:req.params.id})));
router.put("/menu/:id",auth,role("restaurant","admin"),async(req,res)=>res.json(await MenuItem.findByIdAndUpdate(req.params.id,req.body,{new:true})));
router.delete("/menu/:id",auth,role("restaurant","admin"),async(req,res)=>{await MenuItem.findByIdAndDelete(req.params.id);res.json({message:"Food deleted"})});
module.exports=router;
