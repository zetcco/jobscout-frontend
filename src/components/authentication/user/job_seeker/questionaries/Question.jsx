import { BasicCard } from 'components/cards/BasicCard';
import { IconButton, Stack } from '@mui/material';
import { RouterLink } from 'components/RouterLink';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { FormatAlignJustify } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const Question = () => {
  return (
    <>
      <BasicCard>
        <Stack spacing={2} direction={'row'}>
          <img
            style={{ width: 60, height: 60, margin: 'auto', padding: 0 }}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70qUCUgVzIgb_3Gt0AbED0GuWieZz-pcJLw&usqp=CAU'
            alt='python-logo'
          />
          <Stack spacing={0.5} direction={'column'}>
            <h3>Python (Programming Language)</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              commodi ducimus asperiores esse cupiditate consequuntur voluptas
              quo
            </p>
          </Stack>
          <Stack justifyContent={'center'}>
            <IconButton
              size='large'
              color='success'
              component={Link}
              to='/questionaries/python/detail'
            >
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </BasicCard>
      <BasicCard>
        <Stack spacing={2} direction={'row'}>
          <img
            style={{ width: 80, height: 80, margin: 'auto', padding: 0 }}
            src='https://www.yourrightdecision.com/blog/wp-content/uploads/2020/11/163-1.jpg'
            alt='ms-word-logo'
          />
          <Stack spacing={0.5} direction={'column'}>
            <h3>Microsoft Word</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              commodi ducimus asperiores esse cupiditate consequuntur voluptas
              quo
            </p>
          </Stack>
          <Stack justifyContent={'center'}>
            <IconButton
              size='large'
              color='success'
              component={Link}
              to='/questionaries/msword/detail'
            >
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </BasicCard>
    </>
  );
};
