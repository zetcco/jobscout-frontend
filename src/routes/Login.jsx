import { Grid } from "@mui/material"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SigninForm from "../components/authentication/SigninForm"
import { selectAuthUser } from "../features/authSlice";

export const Login = () => {

    const authUser = useSelector(selectAuthUser);

    if (authUser)
        return (<Navigate to={"/home"} replace/>)

    return (
    <Grid container>
        <Grid item xs={12}>
            <SigninForm/>
        </Grid>
    </Grid>
    )
}