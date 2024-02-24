import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter)

mongoose.connect("mongodb+srv://nikhilpathare705:nikhil123@cluster01.cuqi6cj.mongodb.net/blog")
.then((response)=>{
    app.listen(4000);
}).then(()=>{
    console.log("Connnected to the db on port 4000");
}) 
.catch((err)=>{
console.log("Error : ",err);
})