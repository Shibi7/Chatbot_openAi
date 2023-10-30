import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { log } from "console";


export const getAllUsers = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    //get all users
    try {
        const users = await User.find();//select all
        return res.status(200).json({message:  "OK", users});
    } catch (error) {
        console.log(error);        
        return res.status(200).json({message:  "Error", cause:error.message}); 
    }
}

export const userSignup = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    //get user signup details
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser)return res.status(401).send("user already registered with this email");
        const hashedPassword = await hash(password,10);
        const user = new User({name, email, password: hashedPassword });
        await user.save();

        //create and store the token
        res.clearCookie(COOKIE_NAME,{ 
            path : "/",
            domain : "localhost" ,
            httpOnly : true,
            signed :true 
        });

        const token = createToken(user._id.toString(),user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path : "/",domain : "localhost" ,expires , httpOnly : true,signed :true,
        secure:true,
        sameSite:"none"});


        return res.status(201).json({message:  "OK", name: user.name, email: user.email});
    } catch (error) {
        console.log(error);        
        return res.status(200).json({message:  "Error", cause:error.message}); 
    }
    }

export const userLogin = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    //get user signup details
    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email })
        if(!user)
            return res.status(401).send("user not registered ");
        const isPasswordCorrect = await compare(password, user.password);      
        if(!isPasswordCorrect)
            return res.status(403).send("Incorrect password");        
        
        res.clearCookie(COOKIE_NAME,{ 
            path : "/",
            domain : "localhost" ,
            httpOnly : true,
            signed :true ,
            secure:true,
            sameSite:"none"
        });
        // console.log(res);
        const token = createToken(user._id.toString(),user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path : "/",domain : "localhost" ,expires , httpOnly : true,signed :true,secure:true, sameSite:"none"});

        return res.status(201).json({message:  "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);        
        return res.status(200).json({message:  "Error", cause:error.message}); 
    }
}
export const verifyUser = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    //get user signup details
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if(!user)
            return res.status(401).send("user not registered Or Token malfunction");
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }        
        return res.status(200).json({message:  "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);        
        return res.status(200).json({message:  "Error", cause:error.message}); 
    }
}

export const LogoutUser = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    //get user signup details
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if(!user)
            return res.status(401).send("user not registered Or Token malfunction");
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }  
        
        res.clearCookie(COOKIE_NAME,{ 
            path : "/",
            domain : "localhost" ,
            httpOnly : true,
            signed :true ,
            secure:true,
            sameSite:"none"
        });

        return res.status(200).json({message:  "OK user logged out" });
    } catch (error) {
        console.log(error);        
        return res.status(200).json({message:  "Error", cause:error.message}); 
    }
}