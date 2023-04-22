import { JobCreatorHome } from "./profile/job_creator/JobCreatorHome/JobCreatorHome"
import { useSelector } from "react-redux"
import { selectAuthUser } from "../features/authSlice"
import { OrganizationHome } from "../components/profile/OrganizationHome"
import { JobPosts } from "./feed/JobPosts"
import { AdminHome } from "./profile/AdminHome"

export const Home = () => {
    
    const authUser = useSelector(selectAuthUser)

    if (authUser.role === "ROLE_JOB_SEEKER")
        return <JobPosts/>
    else if (authUser.role === "ROLE_JOB_CREATOR")
        return (<JobCreatorHome/>)
    else if (authUser.role === "ROLE_ADMIN")
        return (<AdminHome/>)
    else
        return <OrganizationHome/>
}