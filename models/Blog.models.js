import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title : {
  type : String,
  required : true,
  },
  description : {
  type : String,
  required : true,
  },
  image : {
  type : String,
  required : true,
  },
  user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "User",
    // type :String,
    required : true ,  
  }

},{timestamps : true})

export const Blog =  mongoose.model("Blog",blogSchema)