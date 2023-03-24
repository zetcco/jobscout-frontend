import { Alert, AlertTitle, Box, Button, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import { EducationalCard } from '../../../profile/education/EducationalCard'
import { RouterLink } from '../../../RouterLink'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUser, selectAuthUserToken } from 'features/authSlice'
import { useNavigate } from 'react-router'

const initialState = {
  startYear: '', endYear: '',
  institute: { id: '' },
  degree: { id: '' }
}

export const EducationQualificationForm = forwardRef(({ onUpdate, onCancel }, ref) => {

  const authToken = useSelector(selectAuthUserToken)
  const authUser = useSelector(selectAuthUser)
  const [ degrees, setDegrees ] = useState([])
  const [ institutes, setInstitues ] = useState([])
  const [ qualifications, setQualifications ] = useState([])
  const [ selectedQualification, setSelectedQualification ] = useState(initialState)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ existingLoading, setExistingLoading ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInstitutesAndDegrees = async () => {
      const degrees = await (await axios.get('/qualifications/degrees', { headers: { Authorization: `Bearer ${authToken}` } })).data
      setDegrees(degrees)
      const institutes = await (await axios.get('/qualifications/institutes', { headers: { Authorization: `Bearer ${authToken}` } })).data
      setInstitues(institutes)
      setExistingLoading(true)
      const existingQualifications = await (await axios.get(`/job-seeker/${authUser.id}/qualifications`, { headers: { Authorization: `Bearer ${authToken}` } })).data
      setQualifications(existingQualifications)
      setExistingLoading(false)
    }
    fetchInstitutesAndDegrees()
  }, [])

  const addQualification = () => {
    setQualifications([...qualifications, selectedQualification])
    setSelectedQualification(initialState)
  }

  const updateSkills = async () => {
    try {
      setLoading(true)
      const data = await axios.put('/job-seeker/update/qualifications', qualifications, { headers: { Authorization: `Bearer ${authToken}` } })
      console.log(data.data)
      if (data.status === 200)
        if (onUpdate) onUpdate(data.data) 
        else navigate('/signup/user/seeker/profile/experiences')
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }

  const durationError = selectedQualification.startYear && selectedQualification.endYear && ( selectedQualification.startYear <= 1930 || selectedQualification.endYear <= 1930 || selectedQualification.endYear - selectedQualification.startYear > 8 || selectedQualification.endYear - selectedQualification.startYear <= 0 )

  return (
    <CenteredHeaderCard
        title={" Add Educational Qualifications"} 
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
                  <Button variant='contained' sx={{ width: '100%' }} onClick={updateSkills} disabled={qualifications.length === 0 || loading}>Continue</Button>
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
              <Grid item xs={3} md={1.5}>
                <TextField type={"number"} label="Start Year" value={selectedQualification.startYear} error={durationError} onChange={(e) => { setSelectedQualification({...selectedQualification, startYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={3} md={1.5}>
                <TextField type={"number"} label="End Year" value={selectedQualification.endYear} error={durationError} onChange={(e) => { setSelectedQualification({...selectedQualification, endYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Institute</InputLabel>
                  <Select label="Institute" fullWidth value={selectedQualification.institute.id} onChange={(e) => { setSelectedQualification({...selectedQualification, institute: institutes[e.target.value] }) }}>
                    {
                      institutes.map((institute, index) => (
                        <MenuItem key={index} value={index}>{institute.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Degree</InputLabel>
                  <Select label="Degree" fullWidth value={selectedQualification.degree.id} onChange={(e) => { setSelectedQualification({...selectedQualification, degree: degrees[e.target.value] }) }}>
                    {
                      degrees.map((degree, index) => (
                        <MenuItem key={index} value={index}>{degree.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} md={1}>
                <Button variant='contained' sx={{ height: '100%', width: '100%' }} onClick={addQualification} disabled={ 
                  durationError ||
                  selectedQualification.startYear === '' ||  
                  selectedQualification.endYear === '' ||
                  selectedQualification.degree.id === '' ||
                  selectedQualification.institute.id === ''
                }><AddIcon/></Button>
              </Grid>
            </Grid>
            { qualifications.length !== 0 && <Divider/> }
            { existingLoading ? 
            (
              <Stack width={"100%"} alignItems='center'>
                <CircularProgress/>
              </Stack>
            ) : (
              qualifications.map((qualification, index) => (
                <EducationalCard 
                  key={index}
                  title={qualification.degree.name}
                  subtitle={qualification.institute.name}
                  duration={qualification.startYear + " - " + qualification.endYear}
                  onClose={() => setQualifications(qualifications.filter((val, valIndex) => index !== valIndex))}
                />
              ))
            )}
        </Stack>
    </CenteredHeaderCard>
  )
})

export default EducationQualificationForm
