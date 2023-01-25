import { Typography } from "@mui/material"
import { BasicCard } from "../components/BasicCard"
import { OrgJobPosts } from "./profile/organization/OrgJobPosts"
import { Qualification } from "./profile/job_seeker/Qualifications"
import { JobSeekerPosts} from "./profile/job_seeker/JobSeekerPosts"


export const Home = () => {

    return (
        <>
        <Qualification/>
        <JobSeekerPosts/>
        </>
    )
}