import React from "react";
import TextField from '@mui/material/TextField';
import {Button, Grid ,Stack } from '@mui/material';
import { CenteredHeaderCard } from "../cards/CenteredHeaderCard";

const SignupForm = () => {
    return ( 
        <CenteredHeaderCard
            title={"Register to JobScout"}
            footer = {<Button variant="contained" fullWidth>Register</Button>}
        >
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Grid container spacing={2}>                
                    <Grid item xs={12} md={6}>            
                        <TextField 
                            id="outlined-basic" 
                            label="First Name" 
                            variant="outlined"
                            placeholder = "Enter your first name"
                            fullWidth 
                            required
                        />               
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField 
                            id="outlined-basic" 
                            label="Last Name" 
                            variant="outlined"
                            placeholder = "Enter your last name"
                            fullWidth 
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            placeholder = "Enter your Email"
                            fullWidth 
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>   
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
                            label="Date of Birth" 
                            type="date"
                            placeholder = "Enter your Date of Birth"
                            InputLabelProps={{ shrink: true }}
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
                </Grid>
            </Stack>
        </CenteredHeaderCard>
        
     );
}
 
export default SignupForm;