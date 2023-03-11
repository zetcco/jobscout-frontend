import { Alert, AlertTitle, Autocomplete, Avatar, Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import { EducationalCard as DurationCard } from '../../../profile/education/EducationalCard'
import { RouterLink } from '../../../RouterLink'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import { useNavigate } from 'react-router'
import SearchIcon from '@mui/icons-material/Search';

const initialState = {
    startYear: '', endYear: '',
    jobTitle: { id: '' },
    organization: { id: '' }
}

export const PastExperiencesForm = () => {

  const authToken = useSelector(selectAuthUserToken)
  const [ titles, setTitles ] = useState([])
  const [ experiences, setExperiences ] = useState([])
  const [ selectedExperience, setSelectedExperience ] = useState(initialState)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  // Search Orgs
  const [inputValue, setInputValue] = useState('');
  const [fetchOrgsLoading, setFetchOrgsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchJobTitles = async () => {
      const titles = await (await axios.get('/experience/titles', { headers: { Authorization: `Bearer ${authToken}` } })).data
      setTitles(titles)
    }
    fetchJobTitles()
  }, [])

  const addQualification = () => {
    setExperiences([...experiences, selectedExperience])
    setSelectedExperience(initialState)
    setValue(null)
  }

  // Fetch companies by searching
  useEffect(() => {
    if (inputValue !== '') {
      axios.get(`/organization/search?q=${inputValue}&limit=10&offset=0`)
      .then((response) => {
        setOptions(response.data)
        setFetchOrgsLoading(false)
      }).catch((error) => {
        console.log(error)
        setFetchOrgsLoading(false)
      })
    }
  }, [inputValue])

  const updateExperiences = async () => {
    try {
        setLoading(true)
      const data = await axios.put('/job-seeker/update/experiences', experiences, { headers: { Authorization: `Bearer ${authToken}` } })
      if (data.status === 200)
        navigate('/signup/user/seeker/profile/intro')
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }

  return (
    <CenteredHeaderCard
        title={"Add Past Experiences"} 
        footer={
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: '100%' }}>
                  <RouterLink to="/signup/user/seeker/profile/qualification">
                    <Button variant='outlined' sx={{ width: '100%' }}>Go Back</Button>
                  </RouterLink>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <RouterLink to="/signup/user/seeker/profile/intro">
                    <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                  </RouterLink>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Button variant='contained' sx={{ width: '100%' }} onClick={updateExperiences} disabled={experiences.length === 0 || loading}>Continue</Button>
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
                <TextField type={"number"} label="Start Year" value={selectedExperience.startYear} onChange={(e) => { setSelectedExperience({...selectedExperience, startYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={1.5}>
                <TextField type={"number"} label="End Year" value={selectedExperience.endYear} onChange={(e) => { setSelectedExperience({...selectedExperience, endYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={3.5}>
                    <Autocomplete
                    value={value}
                    inputValue={inputValue}
                    onChange={(e, value) => { 
                        setValue(value) 
                        setSelectedExperience({...selectedExperience, organization: value })
                    }}
                    onInputChange={(e, value) => { setInputValue(value) }}
                    loading={fetchOrgsLoading}
                    filterOptions={(x) => x}
                    options={options}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.displayName }
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => 
                        <TextField 
                        {...params}
                        label="Search Company"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                                {params.InputProps.startAdornment}
                            </InputAdornment>
                            ),
                        }}
                        />
                    }
                    renderOption={(props, option) => {
                        return (
                            <li {...props}>
                            <Stack direction={"row"} spacing={1}>
                                {
                                    option.displayPicture ? (
                                        <Avatar src={option.displayPicture} sx={{ width: 24, height: 24 }}/>
                                    ) : (
                                        <Avatar sx={{ width: 24, height: 24 }}>{ option.displayName && (Array.from(option.displayName)[0]) }</Avatar>
                                    )
                                }
                                <Typography>{option.displayName}</Typography>
                            </Stack>
                            </li>
                        )
                    }}
                    />
              </Grid>
              <Grid item xs={3.5}>
                <FormControl fullWidth>
                  <InputLabel>Job Title</InputLabel>
                  <Select label="Job Title" fullWidth value={selectedExperience.jobTitle.id} onChange={(e) => { setSelectedExperience({...selectedExperience, jobTitle: titles[e.target.value] }) }}>
                    {
                      titles.map((title, index) => (
                        <MenuItem key={index} value={index}>{title.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <Button variant='contained' sx={{ height: '100%' }} onClick={addQualification} disabled={ 
                  selectedExperience.startYear === '' ||  
                  selectedExperience.endYear === '' ||
                  selectedExperience.jobTitle.id === '' ||
                  selectedExperience.organization.id === ''
                }><AddIcon/></Button>
              </Grid>
            </Grid>
            {
              experiences.map((qualification, index) => (
                <DurationCard 
                  key={index}
                  title={qualification.jobTitle.name}
                  subtitle={qualification.organization.displayName}
                  duration={qualification.startYear + " - " + qualification.endYear}
                  onClose={() => setExperiences(experiences.filter((val, valIndex) => index !== valIndex))}
                />
              ))
            }
        </Stack>
    </CenteredHeaderCard>
  )
}

export default PastExperiencesForm