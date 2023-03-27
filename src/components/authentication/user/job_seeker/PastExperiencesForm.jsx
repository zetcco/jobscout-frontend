import { Alert, AlertTitle, Autocomplete, Avatar, Box, Button, CircularProgress, createFilterOptions, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import { OptionCard as DurationCard } from '../../../profile/education/OptionCard'
import { RouterLink } from '../../../RouterLink'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUserId, selectAuthUserToken } from 'features/authSlice'
import { useNavigate } from 'react-router'
import SearchIcon from '@mui/icons-material/Search';

const initialState = {
    startYear: '', endYear: '',
    organization: { id: '' }
}

const filter = createFilterOptions()

export const PastExperiencesForm = forwardRef(({ onUpdate, onCancel }, ref) => {

  const authToken = useSelector(selectAuthUserToken)
  const authUserId = useSelector(selectAuthUserId)
  const [ titles, setTitles ] = useState([])
  const [ experiences, setExperiences ] = useState([])
  const [ selectedExperience, setSelectedExperience ] = useState(initialState)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ existingLoading, setExistingLoading ] = useState(false)
  const [jobTitleInputValue, setJobTitleInputValue] = useState('')
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
      setExistingLoading(true)
      const existingExperiences = await (await axios.get(`/job-seeker/${authUserId}/experiences`, { headers: { Authorization: `Bearer ${authToken}` } })).data
      setExperiences(existingExperiences)
      setExistingLoading(false)
    }
    fetchJobTitles()
  }, [])

  const addExperience = () => {
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
        if (onUpdate) onUpdate(data.data) 
        else navigate('/signup/user/seeker/profile/intro')
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }

  const durationError = selectedExperience.startYear !== '' && selectedExperience.endYear !== '' && ( selectedExperience.startYear <= 1930 || selectedExperience.endYear <= 1930 || selectedExperience.endYear - selectedExperience.startYear > 8 || selectedExperience.endYear - selectedExperience.startYear <= 0 )

  return (
    <CenteredHeaderCard
        title={"Add Past Experiences"} 
        footer={
            <Stack direction="row" spacing={2}>
              {
                onUpdate ? (
                  <>
                    <Box sx={{ width: '100%' }}>
                      <Button onClick={onCancel} variant='outlined' sx={{ width: '100%' }}>Cancel</Button>
                    </Box>
                  </>
                ) : (
                  <>
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
                  </>
                )
              }
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
            <Grid container spacing={1}>
              <Grid item xs={3} md={1.5}>
                <TextField type={"number"} label="Start Year" error={durationError} value={selectedExperience.startYear} onChange={(e) => { setSelectedExperience({...selectedExperience, startYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={3} md={1.5}>
                <TextField type={"number"} label="End Year" error={durationError} value={selectedExperience.endYear} onChange={(e) => { setSelectedExperience({...selectedExperience, endYear: e.target.value}) }}/>
              </Grid>
              <Grid item xs={6} md={4}>
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
              <Grid item xs={10} md={4}>
                <Autocomplete
                  disabled={selectedExperience.organization.id === ''}
                  value={''}
                  inputValue={jobTitleInputValue}
                  blurOnSelect
                  onInputChange={(e, value) => { setJobTitleInputValue(value) }}
                  onChange={(e, newValue) => {
                    let jobTitle = newValue;
                    if (newValue && newValue.inputValue) jobTitle = { id: null, name: newValue.inputValue }
                    setSelectedExperience({...selectedExperience, jobTitle })
                  }}
                  options={titles}
                  renderOption={(props, option) => <li {...props} key={option.id}>{option.name}</li>}
                  renderInput={(params) => ( <TextField {...params} label="Select Job Title" />)}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        id: null,
                        inputValue,
                        name: `Add "${inputValue}"`
                      });
                    }
                    return filtered;
                  }}
                  freeSolo
                  getOptionLabel={ (option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <Button variant='contained' fullWidth sx={{ height: '100%' }} onClick={addExperience} disabled={ 
                  durationError ||
                  selectedExperience.startYear === '' ||  
                  selectedExperience.endYear === '' ||
                  selectedExperience.jobTitle === null ||
                  selectedExperience.organization.id === ''
                }><AddIcon/></Button>
              </Grid>
            </Grid>
            { experiences.length !== 0 && <Divider/> }
            { existingLoading ? 
            (
              <Stack width={"100%"} alignItems='center'>
                <CircularProgress/>
              </Stack>
            ) : (
              experiences.map((qualification, index) => (
                <DurationCard 
                  key={index}
                  title={qualification.jobTitle.name}
                  subtitle={qualification.organization.displayName}
                  duration={qualification.startYear + " - " + qualification.endYear}
                  onClose={() => setExperiences(experiences.filter((val, valIndex) => index !== valIndex))}
                />
              ))
            )}
        </Stack>
    </CenteredHeaderCard>
  )
})

export default PastExperiencesForm;