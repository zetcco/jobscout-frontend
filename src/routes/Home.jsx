import { Typography } from "@mui/material"
import OrganizationSignup from "../components/authentication/OrganizationSignupForm"
import SigninForm from "../components/authentication/SIgningForm"
import SignupForm from "../components/authentication/SingupForm"


export const Home = () => {

    return (
        <>
            <SigninForm/>
            <SignupForm/>
            <OrganizationSignup/>
        </>
    )
}