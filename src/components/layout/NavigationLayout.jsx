import { Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Topbar } from "./Topbar";

export const NavigationLayout = ({ sx }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Topbar />
      <Box>
        <Toolbar />
        <Box sx={sx ? sx : undefined}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </Box>
      </Box>
    </>
  );
};
