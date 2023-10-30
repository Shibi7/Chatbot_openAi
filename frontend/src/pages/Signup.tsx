import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomizedInput from '../components/shared/CustomizedInput'
import { IoIosLogIn } from 'react-icons/io';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      try {
        toast.loading("Signing up", { id : "signup" });
        await auth?.signup(name,email,password);
        toast.success("Signed up successfully", { id : "signup" });
      } catch (error) {
        console.log(error);
        toast.error("Sign up Failed", { id : "signup" });
      }
  }

  useEffect(() => {  
    if(auth?.user)
    return navigate("/login");
  }, [auth])
  

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1} bgcolor={"white"}>
        <Box padding={8} mt={8} display={{md:"flex", sm:"none", xs:"none"}}>
            <img src='airbot.jpg' alt="Robot" style={{width:"400px"}} />
        </Box>
        <Box
            display={"flex"}
            flex={{xs:1 ,md:0.5}} 
            justifyContent={"center"} 
            alignItems={"center"}
            padding={2}
            ml={"aut0"}
            mt={16}
            bgcolor={"white"}>
        <form 
          onSubmit={handleSubmit}
          style={{
          backgroundColor:"#073566",
          margin:'auto',
          padding :"30px" ,
          boxShadow: '10px 10px 20px #000',
          borderRadius :"10px",
          border:"none"
          }} action="">
            <Box sx={{display:"flex",flexDirection:'column',justifyContent:"center"}}>
            <Typography variant='h4' textAlign={'center'} padding={2} fontWeight={600} color={"black"}>
              SIGN UP
            </Typography>
            <CustomizedInput name={'name'} type={'name'} label={'Name'}/>
            <CustomizedInput name={'email'} type={'email'} label={'Email'}/>
            <CustomizedInput name={'password'} type={'password'} label={'Password'}/>
            <Button 
            type='submit'
             sx={{
              px:2,
              py:1 ,
              width:"400px" ,
              mt:2,
              borderRadius:2,
              bgcolor:"#00fffc",
             ":hover":{
              bgcolor:"black",
              color:"white"
             }}} 
             endIcon={<IoIosLogIn/>}
             >
              Sign Up
            </Button>
            </Box>
          </form>
        </Box>
    </Box>
  )
}

export default Signup