import mongoose from "mongoose";
import { Blog } from "../models/Blog.models.js";
import { User } from "../models/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log("Error in blogs", error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "blogs are not available !!" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    let session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session});
    await session.commitTransaction();
  } catch (error) {
    console.log("Error in adding blog", error);
    return res.status(500).json({ message: "Error in adding blogs" });
  }
  return res.status(200).json({ message: "Blog added Sucessfully" ,blog});
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog id is incorect" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(404).json({ message: "Enter id :" });
  }
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    return console.log("Error occured in getting blog", error);
  }
  if (!blog) {
    return res
      .status(404)
      .json({ message: "Blog is not present with this id" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log("Error occuring ", error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Wrong id cannot delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};

export const getByUserId =  async(req,res,next)=>{
    let userId  =  req.params.id;
    let userBlogs ;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
         
    } catch (error) {
    return console.log(error);   
    }
    if(!userBlogs){
        return res.status(404).json({message:"user blogs not found"})
    }
    return res.status(200).json({userBlogs});

}
