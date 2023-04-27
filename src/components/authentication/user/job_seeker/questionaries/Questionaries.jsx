import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { AddCircleOutline } from '@mui/icons-material';
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

  const deleteQuestionary = async (id) => {
    const response = await serverClient.delete(`/questionary/${id}`)
    if (response.status === 200) {
      setPosts(posts => posts.filter(post => post.id !== id))
    }
  }

  return (
    <Box>
      <Typography variant='h5'>Skill Assessment</Typography>
      <Stack spacing={2} sx={{ width: '100%' }} direction={'column'}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
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
              <Button startIcon={<AddCircleOutline/>} variant='outlined'>Create</Button>
            </RouterLink>
          )
        }
        </Stack>
        {
          loading ? <CircularProgress/> : (
          posts.map((questionary, index) => (
            <QuestionCard key={index} id={questionary.id} name={questionary.name} description={questionary.description} badge={questionary.badge} onDelete={user.role === "ROLE_ADMIN" && ( () =>  { deleteQuestionary(questionary.id) } )}/>
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