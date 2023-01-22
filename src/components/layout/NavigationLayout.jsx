import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";

export const NavigationLayout = () => {

    return (
        <>
            <Topbar/>
            <Box>
                <Toolbar/>
                <Box sx={{ mx: { md: '100px', lg: '250px' }, mt: 4 }}>
                    <Outlet/>
                </Box>
            </Box>
        </>
    );
}