import { useSelector } from "react-redux"
import { Messaging } from "../components/profile/Message/Messaging"
import { selectAuthUser } from "../features/authSlice"

export const Home = () => {
    
    const authUser = useSelector(selectAuthUser)

    return (
        <>
            {/* <Messaging/> */}
        </>
    )
}