import { Avatar, Box, Typography } from '@mui/material'
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message:string){
    if(message && message.includes("```")){
      const blocks = message.split("```");
      return blocks;
    }
}
function isCodeBlock(str:string){
  if(str.includes("=")||
  str.includes("{")||
  str.includes("}")||
  str.includes("[")||
  str.includes("]")||
  str.includes("//")||
  str.includes(";")||
  str.includes("#")||
  str.includes("/")){
    return true;
  }
return false;
}
const ChatItem = ({ content , role } : {content:string ,role: "user"|"assistant"}) => {
  const auth  = useAuth();
  const messageBlocks = extractCodeFromString(content);
    return  role == "assistant" ? (
   <Box sx={{display:"flex",
   p:2,
   bgcolor:"rgba(230, 225, 225, 0.85)",   
   my:2,
   gap:2
   }}>
    <Avatar sx={{ml:"0"}}>
    <img src="openai.png" alt="openai" width={"30px"} />
    </Avatar>
    <Box >
      {!messageBlocks && (<Typography sx = {{fontSize:"20px", color:"black"} }>{content}</Typography>)}
      {messageBlocks && messageBlocks.length && messageBlocks.map((block,index)=> isCodeBlock(block)?(
      <SyntaxHighlighter style={coldarkDark} language={messageBlocks[1].split("\n")[0]} key={index}>{block}
      </SyntaxHighlighter>      
      )
      :(
        <Typography fontSize={"20px"} color={"black"} key={index}>{block}</Typography>
      ))}

    </Box>
   </Box>) : (
    <Box sx={{display:"flex",
   p:2,
   bgcolor:"white",
   color:"black",
   gap:2,
   my:2
   }}>
    <Avatar sx={{ml:"0", bgcolor:"black"}}>        
            {auth?.user?.name[0]}
            {auth?.user?.name[1]}
    </Avatar>
    <Box >
      {!messageBlocks && (<Typography sx = {{fontSize:"20px", color:"black", wordWrap:'break-word',maxWidth:'100%'} }>{content}</Typography>)}
      {messageBlocks && messageBlocks.length && messageBlocks.map((block,index)=> isCodeBlock(block)?(
      <SyntaxHighlighter style={coldarkDark} language={messageBlocks[1].split("\n")[0]} key={index}>{block}
      </SyntaxHighlighter>      
      )
      :(
        <Typography fontSize={"20px"} color={"black"} key={index}>{block}</Typography>
      ))}

    </Box>
   </Box>
   )
}

export default ChatItem