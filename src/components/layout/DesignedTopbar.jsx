import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Stack } from '@mui/material';

export const DesignedTopbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography
            variant='h5'
            sx={{ flexGrow: 1, color: (theme) => theme.palette.common.white }}
          >
            JobScout
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: '12', md: 'flex' } }}>
            <IconButton size='large' color='inherit'>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton size='large' color='inherit'>
              <DashboardOutlinedIcon />
            </IconButton>
            <IconButton size='large' color='inherit'>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <IconButton
              edge='end'
              aria-haspopup='true'
              color='inherit'
            >
              <Stack direction='row' spacing={0.5}>
                <AccountCircle size='large'/>
                <Typography>Thanis</Typography>
                <KeyboardArrowDownOutlinedIcon size='small'/>
              </Stack>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
