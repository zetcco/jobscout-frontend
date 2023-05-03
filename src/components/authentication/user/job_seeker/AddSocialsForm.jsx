import { Alert, AlertTitle, Box, Button, CircularProgress, Divider, Grid, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import { OptionCard } from '../../../profile/education/OptionCard'
import { RouterLink } from '../../../RouterLink'
import { useSelector } from 'react-redux'
import { selectAuthUserId, serverClient } from 'features/authSlice'
import { useNavigate } from 'react-router'

export const AddSocialsForm = forwardRef(({ onUpdate, onCancel }, ref) => {

  const authUserId = useSelector(selectAuthUserId)
  const [ links, setLinks ] = useState([])
  const [ newLink, setNewLink ] = useState('')
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ existingLoading, setExistingLoading ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchExistingSocials = async () => {
      setExistingLoading(true)
      const socials = await (await serverClient.get(`/user/${authUserId}/socials`)).data
      setLinks(socials)
      setExistingLoading(false)
    }
    fetchExistingSocials()
  }, [])

  const addLink = () => {
    setLinks([...links, { link: newLink }])
    setNewLink('')
  }

  const updateLinks = async () => {
    try {
      setLoading(true)
      const rawLinks = links.map(link => link.link)
      const data = await serverClient.put('/user/socials', { links: rawLinks })
      if (data.status === 200)
        if (onUpdate) onUpdate(data.data) 
        else navigate('/signup/user/seeker/profile/experiences')
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }

  return (
    <CenteredHeaderCard
        glassEffect={onUpdate ? false : true}
        title={"Add Social Links"} 
        footer={
            <Stack direction="row" spacing={2}>
              {
                onUpdate ? (
                  <>
                    <Box sx={{ width: '100%' }}>
                      <Button variant='outlined' sx={{ width: '100%' }} onClick={onCancel}>Cancel</Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ width: '100%' }}>
                      <RouterLink to="/signup/user/seeker/profile/skills">
                        <Button variant='outlined' sx={{ width: '100%' }}>Go Back</Button>
                      </RouterLink>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <RouterLink to="/signup/user/seeker/profile/experiences">
                        <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                      </RouterLink>
                    </Box>
                  </>
                )
              }
                <Box sx={{ width: '100%' }}>
                  <Button variant='contained' sx={{ width: '100%' }} onClick={updateLinks} disabled={links.length === 0 || loading}>Continue</Button>
                </Box>
            </Stack>
        }>
        <Stack spacing={2} sx={{ width: '100%' }}>
            {
                error && 
                (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>{error.message}</strong>
                    </Alert>
                )
            }
            <Grid container spacing={1} >
              <Grid item xs={10}>
                <TextField label="Add your profile link" value={newLink} onChange={(e) => { setNewLink(e.target.value) }} fullWidth/>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={addLink} sx={{ height: '100%' }} disabled={newLink === ''}>Add</Button>
              </Grid>
            </Grid>
            { links.length !== 0 && <Divider/> }
            { existingLoading ? 
            (
              <Stack width={"100%"} alignItems='center'>
                <CircularProgress/>
              </Stack>
            ) : (
              links.map((link, index) => (
                <OptionCard 
                  key={index}
                  duration={link.link}
                  onClose={() => setLinks(links.filter((val, valIndex) => index !== valIndex))}
                />
              ))
            )}
        </Stack>
    </CenteredHeaderCard>
  )
})

export default AddSocialsForm
