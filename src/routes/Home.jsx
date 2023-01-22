import { Typography } from "@mui/material"
import { BasicCard } from "../components/BasicCard"
import { JobSeekerRecommendation } from "./feed/JobSeekerRecommendation"


export const Home = () => {

    return (
        <>
        <BasicCard>
            <Typography>Home Page</Typography>
        </BasicCard>
            <JobSeekerRecommendation/>
        </>
    )
}