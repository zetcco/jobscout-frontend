import { Grid } from "@mui/material"
import SigninForm from "../components/authentication/SigninForm"

export const Login = () => {
    return (
    <Grid container>
        <Grid item xs={12}>
            <SigninForm/>
        </Grid>
    </Grid>
    )
}