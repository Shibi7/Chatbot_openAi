import { NextFunction,Response ,Request } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi , ChatCompletionRequestMessage } from "openai";


export const generateChatCompletion = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    //get all users
    const {message} = req.body;
    
    try{
    const user = await User.findById(res.locals.jwtData.id);
    if(!user)
    return res.status(400).json({message : "User not registered Or token malfunction"});
    
    //grab chats of the user
       
    const chats = user.chats.map(({role, content}) =>({role, content})) as ChatCompletionRequestMessage[] ;

    chats.push({role:'user',content:message});
    user.chats.push({role:'user',content:message});
    // console.log(user.chats);
      // send the chats along with the new one to openAI api
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);

           //get the latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        console.log(chatResponse.data.choices[0].message);
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats:user.chats});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: "unable to chat something went wrong"});
    }
}

export const getAllChats = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    try{
    const user = await User.findById(res.locals.jwtData.id);
    if(!user)
    return res.status(400).json({message : "User not registered Or token malfunction"});
    
    //grab chats of the user
       
    const chats = user.chats.map(({role, content}) =>({role, content})) as ChatCompletionRequestMessage[] ;
      // send the chats along with the new one to openAI api
    return res.status(200).json({chats:chats});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: "unable to chat something went wrong"});
    }
}
export const deleteAllChats = async(
    req:Request,
    res:Response,
    next:NextFunction) => {
    try{
    const user = await User.findById(res.locals.jwtData.id);
    if(!user)
    return res.status(400).json({message : "User not registered Or token malfunction"});
    
    //grab chats of the user
    //  @ts-ignore  
    user.chats =[];
    await user.save();
      // send the chats along with the new one to openAI api
    return res.status(200);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: "unable to chat something went wrong"});
    }
}
