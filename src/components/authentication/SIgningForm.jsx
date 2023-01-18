import React from "react";
import TextField from '@mui/material/TextField';
import { Avatar, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { BasicCard } from "../BasicCard";
import Box from '@mui/material/Box';

const SigninForm = () => {

const avatarStyle = {backgroundColor:'#28AF38' , align:'center'};
    return (
   <BasicCard>
        <Grid container>

            <Grid item xs = {12}>
                <Box align='center'>
                    <Avatar style = {avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h1>Login to JobScout</h1>
                </Box>              
            </Grid>

            <Grid item xs = {12}>
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                    placeholder = "youremail@example.com"
                    fullWidth 
                    required
                    />
                    <p>Enter your email</p>
            </Grid>
            
            <Grid item xs = {12}>    
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    placeholder = "Your Password"
                    type = "password"
                    fullWidth 
                    required
                />
                <p>Enter your password</p>
            </Grid>

            <Grid item xs = {12}>             
                <Button variant="contained" sx = {{color:'#FFFFFF' , backgroundColor:'#28AF38' , borderRadius:'20px'}} fullWidth>Login</Button>
            </Grid>

            <Grid item xs ={12}>
                <Box>
                    <p style = {{textAlign:'center'}}>____________________________ Don't you have an account? __________________________</p>
                    <Button variant="contained" sx = {{color:'#28AF38' , backgroundColor:'#FFFFFF' , borderRadius:'20px', border: '1px solid #28AF38'}} fullWidth>Register</Button> 
                </Box>                    
            </Grid> 

        </Grid>
   </BasicCard>         
     );
}
 
export default SigninForm;