const jwt=require("jsonwebtoken");
function auth(req,res,next){const t=(req.headers.authorization||"").replace("Bearer ","");if(!t)return res.status(401).json({message:"Login required"});try{req.user=jwt.verify(t,process.env.JWT_SECRET);next()}catch(e){res.status(401).json({message:"Invalid token"})}}
function role(...roles){return(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:"Access denied"})}
module.exports={auth,role};
