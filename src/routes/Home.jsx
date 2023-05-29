import { JobCreatorHome } from "./profile/job_creator/JobCreatorHome/JobCreatorHome"
import { useSelector } from "react-redux"
import { selectAccountCompleted, selectAuthUser } from "../features/authSlice"
import { OrganizationHome } from "../components/profile/OrganizationHome"
import { AdminHome } from "./profile/AdminHome"
import { JobSeekerHome } from "./profile/job_seeker/JobSeekerHome"
import { Navigate } from "react-router-dom"
import { useFetch } from "hooks/useFetch"

export const Home = () => {
    
    const authUser = useSelector(selectAuthUser)
    const accountCompleted = useSelector(selectAccountCompleted)
    const fetch = useFetch()

    if (authUser && !accountCompleted)
        fetch("/user/set-profile-complete","PATCH", {})

    if (authUser.role === "ROLE_JOB_SEEKER")
        return (<JobSeekerHome/>)
    else if (authUser.role === "ROLE_JOB_CREATOR")
        return (<JobCreatorHome/>)
    else if (authUser.role === "ROLE_ADMIN")
        return (<AdminHome/>)
    else if (authUser.role === "ROLE_ORGANIZATION")
        return <OrganizationHome/>
    else
        <Navigate to={"/home.html"}/>
}