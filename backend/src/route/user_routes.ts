import { Router } from "express";
import { userLogin, getAllUsers, userSignup, verifyUser, LogoutUser } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token_manager.js";


const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signupValidator),userSignup)
userRoutes.post("/login",validate(loginValidator),userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, LogoutUser);


export default userRoutes;