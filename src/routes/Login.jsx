import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { LoginForm } from "../components/authentication/LoginForm"
import { fetchUsers } from "../features/usersSlice"

export const Login = () => {

    const disptach = useDispatch()

    useEffect(() => {
        disptach(fetchUsers())
    }, [disptach])

    return (
        <> 
            <LoginForm/>
        </>
    )
}