import { Alert, AlertTitle, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import { EducationalCard } from '../../../profile/education/EducationalCard'
import { RouterLink } from '../../../RouterLink'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import { async } from 'q'
import { useNavigate } from 'react-router'

const initialState = {
  startYear: '', endYear: '',
  institute: { id: '' },
  degree: { id: '' }
}

export const EducationQualificationForm = () => {

  const authToken = useSelector(selectAuthUserToken)
  const [ degrees, setDegrees ] = useState([])
  const [ institutes, setInstitues ] = useState([])
  const [ qualifications, setQualifications ] = useState([])
  const [ selectedQualification, setSelectedQualification ] = useState(initialState)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInstitutesAndDegrees = async () => {
      const degrees = await (await axios.get('/qualifications/degrees', { headers: { Authorization: `Bearer ${authToken}` } })).data
      setDegrees(degrees)
      const institutes = await (await axios.get('/qualifications/institutes', { headers: { Authorization: `Bearer ${authToken}` } })).data
      setInstitues(institutes)
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
      if (data.status === 200)
        navigate('/signup/user/seeker/profile/experiences')
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }

  return (
    <CenteredHeaderCard
        title={" Add Educational Qualifications"} 
        footer={
            <Stack direction="row" spacing={2}>
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
            <Grid container gap={1} justifyContent={"center"}>
              <Grid item xs={1.5}>
                <TextField type={"number"} label="Start Year" value={selectedQualification.startYear} onChange={(e) => { setSelectedQualification({...selectedQualification, startYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={1.5}>
                <TextField type={"number"} label="End Year" value={selectedQualification.endYear} onChange={(e) => { setSelectedQualification({...selectedQualification, endYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={3.5}>
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
              <Grid item xs={3.5}>
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
              <Grid item xs={1}>
                <Button variant='contained' sx={{ height: '100%' }} onClick={addQualification} disabled={ 
                  selectedQualification.startYear === '' ||  
                  selectedQualification.endYear === '' ||
                  selectedQualification.degree.id === '' ||
                  selectedQualification.institute.id === ''
                }><AddIcon/></Button>
              </Grid>
            </Grid>
            {
              qualifications.map((qualification, index) => (
                <EducationalCard 
                  key={index}
                  title={qualification.degree.name}
                  subtitle={qualification.institute.name}
                  duration={qualification.startYear + " - " + qualification.endYear}
                  onClose={() => setQualifications(qualifications.filter((val, valIndex) => index !== valIndex))}
                />
              ))
            }
        </Stack>
    </CenteredHeaderCard>
  )
}

export default EducationQualificationForm
