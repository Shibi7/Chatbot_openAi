import axios from "axios"


export const loginUser = async ( email:string, password :string)=>{
    const res = await axios.post("/user/login",{email, password});
    // console.log(res.status);       

    if(res.status !== 201){
        throw new Error("Unable to login");
    }
    const data = await res.data;

    return data;
}
export const signUp = async ( name:string,email:string, password :string)=>{
    const res = await axios.post("/user/signup",{name,email, password});
    // console.log(res.status);       

    if(res.status !== 201){
        throw new Error("Unable to signup");
    }
    const data = await res.data;

    return data;
}

export const checkAuthStatus = async ()=>{
    const res = await axios.get("/user/auth-status");
    // console.log(res.status);       

    if(res.status !== 200){
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}

export const sendChatRequest = async (message:string)=>{
    const res = await axios.post("/chats/new", {message});

    if(res.status !== 200){
        throw new Error("Unable to send chat");
    }
    const data = await res.data;
    // console.log(data);
    return data;
}
export const getAllChats = async ()=>{
    const res = await axios.get("/chats/current-chats");

    if(res.status !== 200){
        throw new Error("Unable to get all the previous chats");
    }
    const data = await res.data;
    // console.log(data);
    return data;
}
export const deleteAllChats = async ()=>{
    const res = await axios.delete("/chats/delete");

    if(res.status !== 200){
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    // console.log(data);
    return data;
}

export const userLogout = async ()=>{
    const res = await axios.get("/user/logout");

    if(res.status !== 200){
        throw new Error("Unable to logout");
    }
    const data = await res.data;
    // console.log(data);
    return data;
}