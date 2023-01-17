import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUsers } from "../features/usersSlice"

export const Login = () => {

    const disptach = useDispatch()

    useEffect(() => {
        disptach(fetchUsers())
    }, [disptach])

    return (<Typography> Login page </Typography>)
}