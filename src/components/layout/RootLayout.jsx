import { CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {

    return (
        <>
            <CssBaseline/>
            <Outlet/>
        </>
    )
}