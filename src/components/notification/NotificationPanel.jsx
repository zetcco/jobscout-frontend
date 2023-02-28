import { Menu, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  fetchNotifications,
  selectNotifications,
  selectNotificationsLoading,
  timeDifference,
} from 'features/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationMarkAsRead } from './NotificationMarkAsRead';

export const NotificationPanel = ({ anchorEl, setAnchorEl }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const notificationsLoading = useSelector(selectNotificationsLoading);

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => {
        setAnchorEl(null);
      }}
      PaperProps={{
        style: {
          maxHeight: 72 * 4.5,
          width: '47ch',
        },
      }}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={index}>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            width='100%'
            alignItems='center'
            key={index}
          >
            <Stack
              direction={'column'}
              width={notification.status === 'UNREAD' ? '90%' : '100%'}
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {notification.header}
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {notification.content}
              </Typography>
            </Stack>
            <Stack direction={'row'} spacing={1} alignItems='center'>
              {notification.status === 'UNREAD' && <NotificationMarkAsRead />}
              <Typography variant='caption'>
                {timeDifference(new Date(), new Date(notification.timestamp))}
              </Typography>
            </Stack>
          </Stack>
        </MenuItem>
      ))}
      {notificationsLoading && <Typography>Loading</Typography>}
      <MenuItem onClick={() => dispatch(fetchNotifications(2))}>
        <Typography variant='subtitle2'>Load More</Typography>
      </MenuItem>
    </Menu>
  );
};
