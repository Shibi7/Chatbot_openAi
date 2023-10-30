import { TextField } from '@mui/material';
import React from 'react'

type Props ={
    name:string;
    type:string;
    label:string;
}

const CustomizedInput = (props : Props) => {
  return (
    <TextField 
    margin='normal'
    InputLabelProps={{style:{color:"black", fontWeight:"bolder"}}}
    name={props.name}
    type={props.type}
    label={props.label}
    InputProps ={{style:{width : "400px" ,borderRadius : 10,fontSize : 20 , background: "white"}}}
    
    >
     </TextField>
)}

export default CustomizedInput