import { CssBaseline } from "@mui/material"
import { Box } from "@mui/system"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {

    return (
        <>
            <CssBaseline/>
            <Box>
                <Outlet/>
            </Box>
        </>
    )
}