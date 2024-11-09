//ugly way of doing routing 


// function createUserRoutes(app){
//     //route
//     app.post("/user/signup",function(req,res){

//         res.json({
//             message:"You are logged in"
//         })
        
//     })

//     app.post("/user/signin",function(req,res){
        
//         res.json({
//             message:"Incorrect credential"
//         })

//     })

//     app.get("/user/purchases",function(req,res){
    
//         res.json({

//             message:"You have purchased the course"
//         })
//     })

// }


// module.exports={
//     createUserRoutes:createUserRoutes
// }


//better way
const {Router}=require("express");
const bcrypt=require("bcrypt");
const {userModel,PurchaseModel}=require("../db");
const {courseModel}=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config.js");
//const JWT_USER_PASSWORD="puja123";  store in config.js file


//return the router
const userRouter=Router();

// userRouter.post("/signup",async function(req,res){
//     const {email,password,firstName, lastName}=req.body;
//     //same as
//     // const email=req.body.email;
//     // const password=req.body.password;
//     // const firstName=req.body.firstName;     
//     // const lastName=req.body.lastName;


//     //zod validation
//     //hash the password
//     // const hashPassword=await bcrypt.hash(password,5);
//     // console.log(hashPassword);
    
//     await userModel.create({
//         email:email,
//         password:password,
//         firstName:firstName,
//         lastName:lastName
//     })


//     res.json({
//         message:"Signup succeeded"
//     })
    
// })


userRouter.post("/signup", async function(req, res) {
    const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB

    // TODO: Put inside a try catch block
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    
    res.json({
        message: "Signup succeeded"
    })
})


userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;

    //await this bcoz db can be present in us or anyother place
    const user=await userModel.findOne({
        email:email,
        password:password
    });

    if(user){
        const token=jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);


        // later do cookie logic

        res.json({
            token:token
        })

    }else {
        res.status(403).json({
            message:"Incorrect credential"
        })

    }
    
 

})

userRouter.get("/purchases",userMiddleware,async function(req,res){
    const userId=req.userId;

    const purchases=await PurchaseModel.find({
        userId,
    });


    //console.log(purchases);
    const coursesData=await courseModel.find({
        //array of object
        _id:{$in:purchases.map(x=>x.courseId)}
    })


    res.json({

       purchases,
       coursesData
    })
})


module.exports={
    userRouter:userRouter
}