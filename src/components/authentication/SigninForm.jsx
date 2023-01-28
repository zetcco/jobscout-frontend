import React from "react";
import TextField from '@mui/material/TextField';
import { Avatar, Button, Grid, Stack, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CenteredHeaderCard } from "../cards/CenteredHeaderCard";
import { Link as RouterLink } from "react-router-dom";

const SigninForm = () => {
    return (
        <CenteredHeaderCard
        title = {"Login to JobScout"}
        icon = {<Avatar style = {{backgroundColor:'#28AF38'}}><LockOutlinedIcon/></Avatar>}
        footer = {<Button component={RouterLink} to={"/signup/type"} variant="contained" fullWidth>Register</Button>}
        >
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Grid spacing={2}>         
                <Grid>
                <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                        placeholder = "youremail@example.com"
                        fullWidth 
                        required
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined"
                        placeholder = "Your Password"
                        type = "password"
                        fullWidth 
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth>Login</Button>
                    
                </Grid>
                <Grid margin="100px 0px 0px 0px">
                    <Typography align='center'>Don't you have an Account?</Typography>
                </Grid>
            </Grid>
        </Stack>
    </CenteredHeaderCard>        
     );
}
 
export default SigninForm;