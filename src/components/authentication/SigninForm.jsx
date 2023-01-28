import React from "react";
import TextField from '@mui/material/TextField';
import { Avatar, Button, Stack, Typography} from '@mui/material';
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
                <Stack direction={'column'} spacing = {2}>
                    <Stack spacing={1} flexGrow = {1} direction = {'column'}>         
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            placeholder = "youremail@example.com"
                            helperText="Enter your email"
                            fullWidth 
                            required
                            />
                    </Stack>

                    <Stack spacing={1} flexGlow = {1} direction = {'column'}>
                        <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            placeholder = "Your Password"
                            helperText="Enter your password"
                            type = "password"
                            fullWidth 
                            required
                        />
                    </Stack>

                    <Stack flexGrow={1}>
                        <Button variant="contained" fullWidth>Login</Button>                  
                    </Stack>
                </Stack>
                <Stack>
                    <Stack align= {'center'} flexGrow={1}>
                        <Typography variant='body'>Don't you have an Account?</Typography>
                    </Stack>
                </Stack>
        </Stack> 
        }
        />           
     );
}
 
export default SigninForm;