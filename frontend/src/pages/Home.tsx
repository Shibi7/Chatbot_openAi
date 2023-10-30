import { Box, useMediaQuery,useTheme } from '@mui/material'
import React from 'react'
import TypingAnimation from '../components/typer/TypingAnimation'
import Footer from '../components/footer/Footer';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"}
    height ={"100%"}
    >       
       <Box
       sx={{
        display:"flex",
        width:"100%",
        flexDirection:'column',
        alignItems:"center",
        mx:'auto',
        mt:3
       }}>
          <TypingAnimation/>
       </Box>
       <Box sx={{
        display:"flex",
        width:"100%",
        flexDirection:{md:"row",xs:'column',sm:'column'},
        gap:5,
        alignItems:"center",
        my:10,
       }}>
        <img src="robot.png" alt="robot" style={{width:'200px', margin:'auto'}} />
        <img src="openai.png" alt="open_ai" className="rotate" style={{width:'180px', margin:'auto'}} />
       
       </Box>
       <Box
       sx={{
        display:"flex",
        width:"100%",
        mx:'auto',
        my:10,
       }}>
        <img src="chat.jpeg" alt="chatbot" style={{display:"flex",width:isBelowMd?"80%":"60%",borderRadius:20, margin:'auto',boxShadow:"-5px -4px 104px rgba(115, 21, 51, 0.25)",
        marginTop:20,
        marginBottom:20
        
        }} />

       </Box>
      <Footer/>
    </Box>
  )
}

export default Home