const {Router}=require("express");
const courseRouter=Router();
const {userMiddleware}=require("../middleware/user");
const {PurchaseModel,CourseModel}=require("../db");

courseRouter.post("/purchase",userMiddleware,async function(req,res){
    const userId=req.userId;
    const courseId=req.body.courseId;


    await PurchaseModel.create({
        userId,
        courseId
    })
    
    res.json({

        message:"You have successfully bought the course"
    })
})


courseRouter.get("/preview",async function(req,res){
    const courses=await CourseModel.find({});
        res.json({
            courses
        })
       
});
    
    


module.exports={
    courseRouter:courseRouter
}