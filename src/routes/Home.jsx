import { Typography } from "@mui/material"
import { BasicCard } from "../components/BasicCard"
import SigninForm from "../components/authentication/SigninForm"
import { Comments } from "../components/SocialMedia/Comments"


export const Home = () => {

    return (
        <>
        <BasicCard>
            <Typography>Home Page</Typography>
        </BasicCard>
           
            <SigninForm/>
            <Comments/>
        </>
    )
}