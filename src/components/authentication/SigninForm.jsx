import React from "react";
import TextField from '@mui/material/TextField';
import { Alert, Box, AlertTitle, Avatar, Button, Stack, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CenteredHeaderCard } from "../cards/CenteredHeaderCard";
import { Link as RouterLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin, selectAccountEnabled, selectAuthError, selectAuthLoading } from "../../features/authSlice";

const SigninForm = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const loading = useSelector(selectAuthLoading);
    const authError = useSelector(selectAuthError);
    const authEnabled = useSelector(selectAccountEnabled)

    const onSubmit = (data) => { 
        dispatch(requestLogin(data))
    }

    return (
        <CenteredHeaderCard
        title = {"Welcome Back to IT-Scout"}
        icon = {<Avatar style = {{backgroundColor:'#28AF38'}}><LockOutlinedIcon/></Avatar>}
        footer = {<Button component={RouterLink} to={"/signup/type"} variant="contained" fullWidth>Register</Button>}
        children = {
            <Stack direction={'column'} spacing={15} sx={{ width: '100%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={'column'} spacing = {2}>
                        <Box>
                            {
                                authError && 
                                (
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        <strong>{authError.message}</strong>
                                    </Alert>
                                )
                            }
                            {
                                authEnabled === false && 
                                (
                                    <Alert severity="info">
                                        <AlertTitle>Verification</AlertTitle>
                                        <strong>{"Please check your email to verify your account before logging in."}</strong>
                                    </Alert>
                                )
                            }
                        </Box>
                        <Controller
                            name="email"
                            rules={{ required: true }}
                            control={control}
                            defaultValue=""
                            render={ ({field}) => (
                                    <TextField
                                        {...field}
                                        label="Email" 
                                        variant="outlined"
                                        placeholder = "youremail@example.com"
                                        helperText="Enter your email"
                                        fullWidth 
                                        error={errors.email && true}
                                    />
                            )}
                        />

                        <Controller
                            name="password"
                            rules={{ required: true }}
                            control={control}
                            defaultValue=""
                            render={ ({field}) => (
                                <TextField 
                                    {...field}
                                    label="Password" 
                                    variant="outlined"
                                    placeholder = "Your Password"
                                    helperText="Enter your password"
                                    type = "password"
                                    fullWidth 
                                    error={errors.password && true}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" fullWidth disabled={loading}>Login</Button>                  
                    </Stack>
                </form>
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