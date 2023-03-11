import { Button, Stack } from '@mui/material';
import { BasicCard } from 'components/cards/BasicCard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Divider from '@mui/material/Divider';

export const QuestionDetail = () => {
  return (
    <BasicCard style={{width: 600}} sx={{width: '100%'}}>
      <Stack direction={'column'} spacing={2}>
        <Stack spacing={1}>
        <img
          style={{ width: 60, height: 60, margin: 'auto', padding: 0, marginLeft: 0}}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70qUCUgVzIgb_3Gt0AbED0GuWieZz-pcJLw&usqp=CAU'
          alt='python-logo'
        />
        <h3>Python Programming Language Assesment</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos,
        aperiam illum. Qui odit eaque corporis quibusdam doloremque quis numquam</p>
        </Stack>
        <Stack direction={'row'} spacing={2}>
            <FormatListBulletedIcon />
            <p><b>15</b> multiple choice question</p>
        </Stack>
        <Stack direction={'row'} spacing={2}>
            <ScheduleIcon />
            <p><b>1.5 min</b> per question</p>
        </Stack>
        <Stack direction={'row'} spacing={2}>
            <EventAvailableIcon />
            <p>score in the top <b>30%</b> to earn a badge</p>
        </Stack>
        <Divider variant="middle" />
      </Stack>
      <Stack spacing={1}>
        <h4>Before you start</h4>
        <ul>
            <li>You must complete this assesment in one session-make sure your internet is reliable.</li>
            <li>You can retake this assesment once if you dont't earn a badge.</li>
            <li>We won't show your result to anyone without your permission.</li>
        </ul>
        <Divider variant="middle" />
      </Stack>
      <p>Language: <b>English</b></p>
      <Button variant='contained' fullWidth>Start</Button>
    </BasicCard>
  );
};
