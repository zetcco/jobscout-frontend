import { Box, Toolbar } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Topbar } from "./Topbar";

export const NavigationLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Topbar />
      <Box>
        <Toolbar />
        <Box sx={{ mx: { md: "100px", lg: "250px" }, mt: 4 }}>
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
