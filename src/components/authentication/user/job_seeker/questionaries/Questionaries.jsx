import { Button, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import { BasicCard } from 'components/cards/BasicCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Question } from './Question';
import { Box } from '@mui/system';
import { SelectableCard } from 'components/cards/SelectableCard';
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { QuestionCard } from './QuestionCard';
import { useEffect, useState } from 'react';
import { selectAuthUser, serverClient } from 'features/authSlice';
import { useSelector } from 'react-redux';
import { RouterLink } from 'components/RouterLink';

export const Questionaries = () => {

  const [ loading, setLoading ] = useState()
  const [ posts, setPosts ] = useState([])
  const user = useSelector(selectAuthUser)

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
          user.role === "ROLE_ADMIN" && (
            <RouterLink to={'/questionaries/add'}>
              <Button>Add</Button>
            </RouterLink>
          )
        }
        {
          loading ? <CircularProgress/> : (
          posts.map((questionary, index) => (
            <QuestionCard key={index} id={questionary.id} name={questionary.name} description={questionary.description} badge={questionary.badge}/>
          )))
        }
      </Stack>
    </Box>
  );
};

const fetchQuestionaries = async () => {
  const response = await serverClient.get('/questionary');
  return response.data;
}