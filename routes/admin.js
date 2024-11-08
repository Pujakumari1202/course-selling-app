const {Router}=require("express");
const adminRouter=Router();
const {adminModel}=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");


//const JWT_ADMIN_PASSWORD="1234567";



adminRouter.post("/signup",async function(req,res){
    const {email,password,firstName,lastName}=req.body;
    await adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })


    res.json({
        message:"Signup succeeded"
    })

})

adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const admin=await adminModel.findOne({
        email:email,
        password:password

    })

    if(admin){
        const token=jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD);

        res.json({
            token:token
        })
    }else {
        res.status(403).json({
            message:"You are logged in"
        })
    
    }
    
})

adminRouter.post("/course",async function(req,res){
    const adminId=req.body;
    const {title, description, imageUrl, price}=req.body;


    //creating a web3 saas in 6 hr in that video we can see how to load image not the url  of the image
    const course =await CourseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })

    res.json({

        message:"course created",
        courseId:course._id
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