import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { BasicCard } from 'components/cards/BasicCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Question } from './Question';
import { Box } from '@mui/system';
import { SelectableCard } from 'components/cards/SelectableCard';
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { QuestionCard } from './QuestionCard';
import { useEffect, useState } from 'react';
import { serverClient } from 'features/authSlice';

export const Questionaries = () => {

  const [ loading, setLoading ] = useState()
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setPosts(await fetchQuestionaries())
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <Box>
      <Typography variant='h5'>Skill Assessment</Typography>
      <Stack spacing={2} sx={{ width: '100%' }} direction={'column'}>
        <TextField
          sx={{ mt: 3, mb: 2 }}
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
        {
          posts.map((questionary, index) => (
            <QuestionCard key={index} id={questionary.id} name={questionary.name} description={questionary.description}/>
          ))
        }
      </Stack>
    </Box>
  );
};

const fetchQuestionaries = async () => {
  const response = await serverClient.get('/questionary');
  return response.data;
}