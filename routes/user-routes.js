import express  from "express";
import { getAllUser, login, signup } from "../controllers/user-controller.js";

 const router =  express.Router();

//we pass the controoler functions inside it 
router.get("/",getAllUser)

router.post("/signup",signup)

router.post("/login",login)

export default router;