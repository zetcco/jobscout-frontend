import React from "react";
import TextField from '@mui/material/TextField';
import {Button, Grid  } from '@mui/material';
import { BasicCard } from "../BasicCard";

const SignupForm = () => {
    return ( 
        <Grid >
            <BasicCard>
            <Grid container spacing={2}>                
                <Grid item xs={6}>            
                    <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        placeholder = "Enter your first name"
                        fullWidth 
                        required
                    />               
                </Grid>

                <Grid item xs={6}>
                    <TextField 
                        id="outlined-basic" 
                        label="Last Name" 
                        variant="outlined"
                        placeholder = "Enter your last name"
                        fullWidth 
                        required
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                        placeholder = "Enter your Email"
                        fullWidth 
                        required
                    />
                </Grid>

                <Grid item xs={6}>   
                    <TextField 
                        id="outlined-basic" 
                        label="Contact Number" 
                        variant="outlined"
                        placeholder = "Enter your Contact No"
                        fullWidth 
                        required
                    />          
                </Grid>

                <Grid item xs={12}>   
                    <TextField 
                        id="outlined-basic" 
                        label="Date of Birth" 
                        variant="outlined"
                        placeholder = "Enter your Date of Birth"
                        type = "date"
                        fullWidth 
                        required
                    />        
                </Grid>

                <Grid item xs={12}>   
                    <TextField 
                        id="outlined-basic" 
                        label="Address" 
                        variant="outlined"
                        placeholder = "Enter your Address"
                        fullWidth 
                        required
                    />       
                </Grid>

                <Grid item xs={12}>   
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined"
                        placeholder = "Enter your Password"
                        type = "password"
                        fullWidth 
                        required
                    />      
                </Grid>

                <Grid item xs={12}>   
                    <TextField 
                        id="outlined-basic" 
                        label="Password Conformation" 
                        variant="outlined"
                        placeholder = "Re-enter your Password"
                        type = "password"
                        fullWidth 
                        required
                    />     
                </Grid>

                <Grid item xs={12}>   
                   <Button variant="contained" sx = {{color:'#FFFFFF' , backgroundColor:'#28AF38' , borderRadius:'20px'}} fullWidth>Register</Button>
                </Grid>       
                </Grid>
            </BasicCard>
        </Grid>
     );
}
 
export default SignupForm;