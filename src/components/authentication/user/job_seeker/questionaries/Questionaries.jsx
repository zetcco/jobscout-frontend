import { Stack, TextField } from '@mui/material';
import { BasicCard } from 'components/cards/BasicCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Question } from './Question';

export const Questionaries = () => {
  return (
    <BasicCard>
      <h2>Skill Assessment</h2>
      <Stack spacing={2} sx={{ width: '100%' }} direction={'column'}>
        <TextField
          id='outlined-basic'
          label='search-assesment'
          variant='outlined'
          placeholder='Python'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Question />
      </Stack>
    </BasicCard>
  );
};
