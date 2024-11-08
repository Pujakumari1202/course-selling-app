const {Router}=require("express");
const adminRouter=Router();
const {adminModel}=require("../db");


adminRouter.post("/signup",function(req,res){
    res.json({
        message:"You are logged in"
    })

})

adminRouter.post("/signin",function(req,res){
    res.json({
        message:"You are logged in"
    })

})

adminRouter.post("/course",function(req,res){
    res.json({
        message:"You are logged in"
    })

})

adminRouter.put("/course",function(req,res){

    res.json({
        message:"You are logged in"
    })
})

adminRouter.get("/course/bulk",function(req,res){

    res.json({
        message:"You are logged in"
    })
})


module.exports={
    adminRouter:adminRouter
}