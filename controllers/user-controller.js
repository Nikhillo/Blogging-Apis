import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log("Error in user", error);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found " });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log("Error in searching existing user : ", error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({
        message:
          "User is already available , please login through different email id !!",
      });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs:[],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log("Error ", error);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log("Error : ", error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Invalid email !!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "Incorrect Password !!" });
  }
  return res.status(200).json({ message: "Login Succesfull " });
};
