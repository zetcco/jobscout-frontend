import { BasicCard } from 'components/cards/BasicCard';
import { Stack } from '@mui/material';

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
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              commodi ducimus asperiores esse cupiditate consequuntur voluptas
              quo
            </h6>
          </Stack>
        </Stack>
      </BasicCard>
      <BasicCard>
        <Stack spacing={2} direction={'row'}>
          <img
            style={{ width: 80, height: 80, margin: 'auto', padding: 0}}
            src='https://www.yourrightdecision.com/blog/wp-content/uploads/2020/11/163-1.jpg'
            alt='ms-word-logo'
          />
          <Stack spacing={0.5} direction={'column'}>
            <h3>Microsoft Word</h3>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              commodi ducimus asperiores esse cupiditate consequuntur voluptas
              quo
            </h6>
          </Stack>
        </Stack>
      </BasicCard>
    </>
  );
};
