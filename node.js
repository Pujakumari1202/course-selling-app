// take from npm docs
require('dotenv').config()
console.log(process.env.MONGO_URL)

const express=require("express");

const mongoose=require("mongoose");

// const jwt=require("jsonwebtoken");
// const JWT_SECRET="puja123";

// const {createUserRoutes, userRouter}=require("./routes/user");
// const {createCourseRoutes}=require("./routes/courses");

const {userRouter}=require("./routes/user");  
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");


const app=express();

app.use(express.json());

//better way
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

// createUserRoutes(app);
// createCourseRoutes(app);

//Routing in express , the express Router


// app.use(express.json());


// function auth(req,res,next){

// }


//first it will run
async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("Listening on port 3000");
}


main();