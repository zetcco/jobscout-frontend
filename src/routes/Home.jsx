import { Typography } from "@mui/material"
import { BasicCard } from "../components/BasicCard"
import { OrgJobPosts } from "./profile/organization/OrgJobPosts"
import { Qualification } from "./profile/job_seeker/Qualifications"
import { Posts} from "./profile/job_seeker/Posts"


export const Home = () => {

    return (
        <>
        <Qualification/>
        <Posts/>
        </>
    )
}