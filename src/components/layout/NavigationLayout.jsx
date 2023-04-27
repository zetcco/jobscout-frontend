import { Alert, AlertTitle, Box, Snackbar, Toolbar } from "@mui/material";
import { selectWebSocketError, webSocketFailedClear } from "features/websocketSlice";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Topbar } from "./Topbar";
import { clearToast, selectToast } from "features/toastSlice";
import { useTheme } from "@emotion/react";

export const NavigationLayout = ({ sx, noRouteAnimation }) => {
  const { pathname } = useLocation();

  const webSocketError = useSelector(selectWebSocketError);
  const toast = useSelector(selectToast);
  const dispatch = useDispatch()
  const { mixins: { toolbar } } = useTheme()

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
            <Snackbar open={ toast.isOpen } anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }} sx={{ top: { xs: toolbar?.minHeight + 14 } }} autoHideDuration={3500} onClose={() => { dispatch(clearToast()) }}>
              <Alert severity={toast.severity}>
                <strong>{toast.message}</strong>
              </Alert>
            </Snackbar>

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
