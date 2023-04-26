import { Alert, AlertTitle, Box, Snackbar, Toolbar } from "@mui/material";
import { selectWebSocketError, webSocketFailedClear } from "features/websocketSlice";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Topbar } from "./Topbar";

export const NavigationLayout = ({ sx, noRouteAnimation }) => {
  const { pathname } = useLocation();

  const webSocketError = useSelector(selectWebSocketError);
  const dispatch = useDispatch()

  return (
    <>
      <Topbar />
      <Box>
        <Toolbar />
        <Box sx={sx ? sx : undefined}>
          <motion.div
            key={noRouteAnimation ? undefined : pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            { webSocketError && (
              <Snackbar
                open={webSocketError}
                onClose={() => dispatch(webSocketFailedClear())}
                autoHideDuration={2000}
              >
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>Failed to connect to server. Retrying...</strong>
                </Alert>
              </Snackbar>
            )}
            <Outlet />
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

NavigationLayout.defaultProps = {
  sx: { mx: { md: "100px", lg: "250px" }, mt: 4 }
}
