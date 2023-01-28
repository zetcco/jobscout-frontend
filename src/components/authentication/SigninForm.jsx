import React from "react";
import TextField from '@mui/material/TextField';
import { Avatar, Button, Grid, Stack , Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CenteredHeaderCard } from "../cards/CenteredHeaderCard";
import { Link as RouterLink } from "react-router-dom";

const SigninForm = () => {
    return (
        <CenteredHeaderCard
        title = {"Login to JobScout"}
        icon = {<Avatar style = {{backgroundColor:'#28AF38'}}><LockOutlinedIcon/></Avatar>}
        footer = {<Button component={RouterLink} to={"/signup/type"} variant="contained" fullWidth>Register</Button>}
        children = {
            <Stack direction={'column'} spacing={15} sx={{ width: '100%' }}>
                <Stack direction={'column'} spacing = {4}>
                    <Stack spacing={1} flexGrow = {1} direction = {'column'}>         
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            placeholder = "youremail@example.com"
                            fullWidth 
                            required
                            />
                        <Typography>Enter your email</Typography>
                    </Stack>

                    <Stack spacing={1} flexGlow = {1} direction = {'column'}>
                        <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            placeholder = "Your Password"
                            type = "password"
                            fullWidth 
                            required
                        />
                        <Typography>Enter your password</Typography>
                    </Stack>

                    <Stack flexGrow={1}>
                        <Button variant="contained" fullWidth>Login</Button>                  
                    </Stack>
                </Stack>
                <Stack>
                    <Stack align= {'center'} flexGrow={1}>
                        <Typography variant = {'h6'}>Don't you have an Account?</Typography>
                    </Stack>
                </Stack>
        </Stack> 
        }
        />           
     );
}
 
export default SigninForm;