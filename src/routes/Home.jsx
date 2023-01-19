import { Typography } from "@mui/material"
import { BasicCard } from "../components/BasicCard"
import SigninForm from "../components/authentication/SigninForm"


export const Home = () => {

    return (
        <>
        <BasicCard>
            <Typography>Home Page</Typography>
        </BasicCard>
           
            <SigninForm/>
        </>
    )
}