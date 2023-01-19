import { Typography } from "@mui/material"
import SigninForm from "../components/authentication/SigninForm"
import SignupForm from "../components/authentication/SignupForm"


export const Home = () => {

    return (
        <>
            <SigninForm/>
            <SignupForm/>
        </>
    )
}