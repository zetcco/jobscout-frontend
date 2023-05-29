import { Grid } from "@mui/material"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SigninForm from "../components/authentication/SigninForm"
import { selectAccountCompleted, selectAccountEnabled, selectAuthUser } from "../features/authSlice";

export const Login = () => {

    const accountCompleted = useSelector(selectAccountCompleted);
    const authUser = useSelector(selectAuthUser)

    if (authUser && !accountCompleted) {
        if (authUser.role === "ROLE_JOB_CREATOR")
            return (<Navigate to={"/signup/user/creator/profile/company"} replace/>)
        else if (authUser.role === "ROLE_JOB_SEEKER")
            return (<Navigate to={"/signup/user/seeker/profile/skills"} replace/>)
        else if (authUser.role === "ROLE_ORGANIZATION")
            return (<Navigate to={"/signup/organization/profile"} replace/>)
    } else if (authUser && accountCompleted)
        return (<Navigate to={"/home"} replace/>)
    
    

    return (
    <Grid container>
        <Grid item xs={12}>
            <SigninForm/>
        </Grid>
    </Grid>
    )
}