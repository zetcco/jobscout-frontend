import { Button, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { AddCircleOutline } from '@mui/icons-material';
import { QuestionCard } from './QuestionCard';
import { useEffect, useState } from 'react';
import { selectAuthUser, serverClient } from 'features/authSlice';
import { useSelector } from 'react-redux';
import { RouterLink } from 'components/RouterLink';
import { useFetch } from 'hooks/useFetch';

export const Questionaries = () => {

  const [ loading, setLoading ] = useState()
  const [ posts, setPosts ] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  const user = useSelector(selectAuthUser)
  const fetch = useFetch()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setPosts(await fetchQuestionaries())
      setLoading(false)
    }
    fetch()
  }, [])

  const deleteQuestionary = async (id) => {
    fetch(`/questionary/${id}`, "DELETE", { onSuccess: () => {
      setPosts(posts => posts.filter(post => post.id !== id))
    }, successMsg: "Questionary Deleted", errorMsg: "Failed to delete questionary" })
  }

  const searchQuestionary = async () => {
    setLoading(true)
    await fetch(`/questionary/search?q=${searchQuery}`, "GET", { onSuccess: (data) => {
      setPosts(data)
    } })  
    setLoading(false)
  }

  return (
    <Box>
      <Typography variant='h5'>Skill Assessment</Typography>
      <Stack spacing={2} sx={{ width: '100%' }} direction={'column'}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <TextField
          sx={{ mt: 3, mb: 2 }}
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value) }}
          onKeyDown={e => { if (e.key === 'Enter') searchQuestionary() }}
          label='Search for Questionaries'
          variant='outlined'
          placeholder='ex: Python'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
            <IconButton variant='outlined' size='large' color='primary' onClick={searchQuestionary}>
                <SearchIcon/>
            </IconButton>
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
            posts.length !== 0 ? (
              posts.map((questionary, index) => (
              <QuestionCard key={index} id={questionary.id} name={questionary.name} description={questionary.description} badge={questionary.badge} onDelete={user.role === "ROLE_ADMIN" && ( () =>  { deleteQuestionary(questionary.id) } )}/>
              ))) : (
              <Typography>No questionaries found</Typography>
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