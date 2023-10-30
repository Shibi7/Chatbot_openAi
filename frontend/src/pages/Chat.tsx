import { Avatar, Box, Button, Icon, IconButton, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteAllChats, getAllChats, sendChatRequest } from '../components/helpers/ApiCommunicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// You can access each chat message using chatMessages[index]
type Message = {
  role:"user"|"assistant",
  content:string
}
const Chat =  () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [chatMessages , setChatMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.success("Loaded the previous chats", { id : "chat" , position : "bottom-center"})
      getAllChats().then((data)=>{
      setChatMessages([...data.chats]);
           }).catch((err)=>{
      toast.error("Unable to load the data", { id : "chat" , position : "bottom-center"})
      })}
  }, [auth]);
  
  useEffect(() => {
    if(!auth?.user)
    return navigate("/login");
  }, [auth])


  const handleDelete =async () => {
    try {
      toast.loading("Deleting the chats",{id : "chat"})
      deleteAllChats();
      setChatMessages([]);
      toast.success("Deleted the chats",{id : "chat"})

    } catch (error) {
      toast.error("Cannot delete",{id:'chats'});
    }
      
  }

  const handleSubmit = async()=>{
    const content = inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newMessage :Message= { role:"user",content};
    setChatMessages((prev) => [...prev,newMessage]);
    try {
      toast.loading("Creating response", { id : "chat" , position : "bottom-center"});
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
      toast.dismiss("chat");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the response", { id : "chat" });
    }
  };

  const handleInputKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return <Box sx = {{
    display:'flex' ,
    flex:1 ,
    width:'100%',
    height:'100%' ,
    bgcolor:"white",
    mt :3,
    gap:3,
    overflow:'scroll',
    overflowX:'auto',
    overflowY:'hidden',
    wordWrap:'break-word',          


     }}>
      <Box sx = {{display:{md:'flex' ,xs:'none',sm:'none'}, flex:0.2 , flexDirection:'column'}}>
        <Box sx = {{
          display:'flex' ,
          width:'100%',
          height:'60vh' ,
          bgcolor:"rgb(4, 26, 21)",
          borderRadius: 5,
          flexDirection : 'column',
          mx:3,
     }}>
      <Avatar sx={{mx:"auto" ,
          my:2,
          bgcolor:"white",
          color:"black",
          fontWeight:750,
          }}>
            {auth?.user?.name[0]}
            {auth?.user?.name[1]}
          {/* { auth?.user?.name.split(" ")[1][0] } */}
      </Avatar>
      <Typography sx={{mx:'auto',
            fontFamily:"works sans"
          }}>
            You are taking to CHATBOT (-- /|\ O)
      </Typography>
      <Typography sx={{mx:'auto',
            fontFamily:"works sans",
            my :4,
            p:3,
          }}>
            You can ask some questions related to Knowledge,Business,Advices, Education etc.But avoid sharing personal information
      </Typography>
      <Button  sx={{
        width:"200px",
        my:'auto',
        mx:'auto',
        bgcolor:red[300],
        fontWeight:700,
        color:'white',
        borderRadius:3,
        ":hover":{
          bgcolor:red.A400,
        }
      }}
      onClick={handleDelete}
      >
        CLEAR CONVERSATIONS
      </Button>
        </Box>
      </Box>
      <Box sx = {{display:'flex', flex:{md:0.8 ,xs:1,sm:1} , flexDirection:'column', px:3,}}>
          <Typography sx = {{ fontSize:"40px",color:"black",mb:2,mx:'auto',fontWeight:600 , fontStyle:'italic'}}>
            Model - GPT 3.5 TURBO
          </Typography>
          <Box sx={{
           display:'flex' ,
           width:'100%',
           height:'60vh' ,
           bgcolor:"white",
           borderRadius: 3,
           flexDirection : 'column',
           mx:'auto',
           overflow:'scroll',
           overflowX:'hidden',
           overflowY:'auto',
           overscrollBehavior:'smooth',
        }}>
          {chatMessages.map((chat,index)=>(<ChatItem content={chat.content} role={chat.role == "user" ? "user" :"assistant"} key={index}/>)
)}
        </Box>
        <div style={{width:"100%", backgroundColor:"transparent", 
        borderRadius:8 , 
        display:'flex',
        marginRight:'auto'
       }} >  
        {" "}
        <textarea 
        ref = {inputRef}
        // type="text" 
        placeholder ="Send a message"
        onKeyUp={handleInputKeyPress}
        style={{width:"100%", backgroundColor:"rgb(13,15,10)", padding:'30px' ,
        border:"none" , 
        borderRadius:10,
        outline:"none" ,
       color:"white" ,
       fontSize:"20px" ,
       overflowY:'auto',
       overflowX:'auto',
       }} />
       <IconButton 
       onClick={handleSubmit}
       sx={{
        ml :'auto',
        color:"black",  
       }}>
        <IoMdSend/>
       </IconButton>
       </div>
        </Box>
  </Box>
}

export default Chat