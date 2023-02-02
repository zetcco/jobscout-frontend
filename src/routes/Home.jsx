import { Qualification } from "./profile/job_seeker/Qualifications"
import { JobSeekerPosts} from "./profile/job_seeker/JobSeekerPosts"
import { JobCreatorHome } from "./profile/job_creator/JobCreatorHome/JobCreatorHome"
import { useSelector } from "react-redux"
import { Messaging } from "../components/profile/Message/Messaging"
import { selectAuthUser } from "../features/authSlice"

export const Home = () => {
    
    const authUser = useSelector(selectAuthUser)

    return (
        <>
            <JobCreatorHome/>
        </>
    )
}