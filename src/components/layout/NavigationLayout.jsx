import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";

export const NavigationLayout = () => {

    return (
        <>
            <Topbar/>
            <Box>
                <Toolbar/>
                <Outlet/>
            </Box>
        </>
    );
}