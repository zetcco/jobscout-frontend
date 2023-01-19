import { Typography } from "@mui/material"
import OrgSingupForm from "../components/authentication/OrgSignupForm"
import SigninForm from "../components/authentication/SIgningForm"
import SignupForm from "../components/authentication/SingupForm"


export const Home = () => {

    return (
        <>
            <SigninForm/>
            <SignupForm/>
            <OrgSingupForm/>
        </>
    )
}