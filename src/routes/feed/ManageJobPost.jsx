import { Stack } from '@mui/system'
import {Autocomplete, Box, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Popover, Select, TextField, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ManageJobPostFrom from '../../components/job_postings/ManageJobPostFrom'
import SmallPanel from '../../components/SmallPanel'
import { useFetch } from 'hooks/useFetch'
import { useParams } from 'react-router-dom'
import { BasicCard } from 'components/cards/BasicCard'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { ResponsiveIconButton } from 'components/ResponsiveIconButton'
import { CheckCircleOutline, Clear, DeleteOutline, FilterListRounded, SearchOutlined } from '@mui/icons-material'
import { getQuery } from 'hooks/getQuery'
import { RouterLink } from 'components/RouterLink'
import { getDateWithAddition } from 'components/meeting/ScheduleMeeting'
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const init_search_query = {
    name: '',
    status: '',
    degrees: [],
    institutes: [],
    categories: [],
    skills: []
}

function ManageJobPost() {

  const { postId } = useParams()
  const [ loading, setLoading ] = useState(false)
  const [ applications, setApplications ] = useState([])
  const [searchQuery, setSearchQuery] = useState(init_search_query)
  const [degrees, setDegrees] = useState([])
  const [institutes, setInstitues] = useState([])
  const [skills, setSkills] = useState([])
  const [showFilters, setShowFilters] = useState(null)
  const [showInterview, setShowInterview] = useState(null)
  const [ timestamp, setTimestamp ] = useState(getDateWithAddition(1));
  const [ startTime, setStartTime ] = useState(null);
  const fetch = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      fetch('/qualifications/degrees', "GET", { onSuccess: (data) => { setDegrees(data) } })
      fetch('/qualifications/institutes', "GET", { onSuccess: (data) => { setInstitues(data) } })
      fetch('/skills/', "GET", { onSuccess: (data) => { setSkills(data) } })

      await fetch(`/jobpost/${postId}/applications`, "GET", { onSuccess: setApplications })
      setLoading(false)
    }
    fetchData()
  }, [])

  const setFilters = (key, value) => {
    setSearchQuery(ex => ({...ex, [key]: value}))
  }

  const filterApplications = () => {
    fetch(`/jobpost/${postId}/applications?${getQuery(searchQuery)}`, "GET", { onSuccess: setApplications })
  }

  const scheduleInterview = (id) => {
    fetch(`/jobpost/interview/${id}?time=${startTime.$H}:${startTime.$m}:00`, "PATCH", { data: { timestamp }, onSuccess: () => {
      setApplications(applications => applications.filter(obj => obj.id !== id))
      setTimestamp(getDateWithAddition(1))
      setStartTime(null)
    }, successMsg: "Scheduled interview", errorMsg: "Failed to schedule interview"})
  }

  if (loading)
    return (
      <Stack width={'100%'} justifyContent={'center'}>
          <CircularProgress sx={{ m: 'auto' }}/>
      </Stack>
    )

  return (
        <Stack justifyContent="space-around" alignItems="flex-start" spacing={3}>
          <Typography variant='h4'>Applicants</Typography>
          <Button startIcon={<FilterListRounded/>} onClick={e => { setShowFilters(e.currentTarget) }}>Filters</Button>
          <Popover open={Boolean(showFilters)} onClose={() => { setShowFilters(null) }} anchorEl={showFilters} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Stack spacing={2} m={2}>
              <FormControl sx={{ width: { xs: 300, sm: 250 } }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={searchQuery.status} 
                  onChange={e => { setFilters('status', e.target.value) }} 
                  input={<OutlinedInput label={'Status'}/>}
                  >
                      <MenuItem value={"INTERVIEW_SELECTED"}>Interview Selected</MenuItem>
                      <MenuItem value={"ACCEPTED"}>Accepted</MenuItem>
                      <MenuItem value={"REJECTED"}>Rejected</MenuItem>
                      <MenuItem value={"APPLIED"}>Not Decided</MenuItem>
                  </Select>
              </FormControl>
              <Autocomplete
                  sx={{ width: { xs: 300, sm: 250 } }}
                  autoComplete
                  multiple
                  value={searchQuery.degrees}
                  onChange={(e, value) => { setFilters('degrees', value) }} 
                  options={degrees}
                  renderInput={params => <TextField {...params} label='Degrees'/>}
                  getOptionLabel={option => option.name}
                  renderOption={(props, option) => (
                      <Box component={'li'} {...props} value={option.id}>
                          {option.name}
                      </Box>
                  )}
              />
              <Autocomplete
                  sx={{ width: { xs: 300, sm: 250 } }}
                  autoComplete
                  multiple
                  value={searchQuery.institutes}
                  onChange={(e, value) => { setSearchQuery(ex => ({...ex, institutes: value})) }} 
                  options={institutes}
                  renderInput={params => <TextField {...params} label='Institute'/>}
                  getOptionLabel={option => option.name}
                  renderOption={(props, option) => (
                      <Box component={'li'} {...props} value={option.id}>
                          {option.name}
                      </Box>
                  )}
              />
              <Autocomplete
                  sx={{ width: { xs: 300, sm: 250 } }}
                  autoComplete
                  multiple
                  value={searchQuery.skills}
                  onChange={(e, value) => { setSearchQuery(ex => ({...ex, skills: value})) }} 
                  options={skills}
                  renderInput={params => <TextField {...params} label='Skills'/>}
                  getOptionLabel={option => option.name}
                  renderOption={(props, option) => (
                      <Box component={'li'} {...props} value={option.id}>
                          {option.name}
                      </Box>
                  )}
              />
              <Stack width={'100%'} direction={'row'} justifyContent={'right'}>
                  <Button onClick={() => { setSearchQuery(init_search_query) }} color='error' startIcon={<Clear/>}>Clear</Button>
                  <Button onClick={() => { 
                    filterApplications()
                    setShowFilters(null) 
                  }} startIcon={<SearchOutlined/>}>Search</Button>
              </Stack>
          </Stack>
          </Popover>
          <Stack spacing={2} width={'100%'}>
            {
              applications.length === 0 ? (
                <Typography>No applications found</Typography>
              ) : ( 
              applications.map((application, index) => (
                <BasicCard sx={{ width: '100%' }} key={index}>
                    <Stack direction={'row'} spacing={{ xs: 2, md: 10 }} alignItems={'center'} justifyContent={'space-between'}>
                        <RouterLink to={`/users/${application.jobSeeker.id}`}>
                        <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                            <AvatarWithInitials size={{ xs: 60, md: 70 }} src={application.jobSeeker.displayPicture} name={application.jobSeeker.displayName}/>
                            <Stack direction={'column'} spacing={0.2}>
                                <Typography variant='h5' fontWeight={600}>{ application.jobSeeker.displayName }</Typography>
                                <Typography fontSize={16}>{ application.jobSeeker.email }</Typography> 
                            </Stack>                      
                        </Stack>
                        </RouterLink>
                        { application.status === "INTERVIEW_SELECTED" && <Chip label="Interview Called" variant="outlined"/> }
                        { application.status === "ACCEPTED" && <Chip label="Accepted" variant="outlined" color='success'/> }
                        { application.status === "REJECTED" && <Chip label="Rejected" variant="outlined" color='error'/> }
                        { application.status === "APPLIED" && <Chip label="Not Decided" variant="outlined" color='info'/> }
                        { application.status !== "INTERVIEW_SELECTED" && (
                        <Stack direction={'row'} spacing={1}>
                            <ResponsiveIconButton color={'error'} startIcon={<DeleteOutline/>} 
                            onClick={ () => { fetch(`/jobpost/application/${application.id}/reject`, "PATCH", { successMsg: "Application Rejected", onSuccess: () => {
                              setApplications(applications => applications.filter(obj => obj.id !== application.id))
                            }})}}
                            disabled={application.status === "REJECTED"}
                            >Reject</ResponsiveIconButton>
                            <ResponsiveIconButton startIcon={<CheckCircleOutline/>}
                            onClick={ () => { fetch(`/jobpost/application/${application.id}/accept`, "PATCH", { successMsg: "Application Accepted", onSuccess: () => {
                              setApplications(applications => applications.filter(obj => obj.id !== application.id))
                            }})}}
                            disabled={application.status === "ACCEPTED"}
                            >Accept</ResponsiveIconButton>
                            { application.status === "ACCEPTED" && 
                             (
                              <>
                             <ResponsiveIconButton startIcon={<CheckCircleOutline/>} onClick={e => { setShowInterview(e.currentTarget) }} >Interview</ResponsiveIconButton> 
                              <Popover open={Boolean(showInterview)} onClose={() => { setShowInterview(null) }} anchorEl={showInterview} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Stack m={2} spacing={1} sx={{ width: { xs: 400 } }}>
                                <Typography variant="body2">Pick a date for the interview</Typography>
                                <Stack direction={'row'} spacing={1}>
                                    <TextField
                                        type="date"
                                        value={timestamp.toLocaleDateString('en-CA')}
                                        onChange={(e) => { setTimestamp(new Date( e.target.value )) }}
                                        fullWidth
                                        inputProps={{
                                            min: (getDateWithAddition(1).toLocaleDateString('en-CA'))
                                        }}
                                    />
                                    <TextField label="Day(s)" type={'number'} value={Math.ceil((timestamp - new Date())/(1000 * 60 * 60 * 24))} onChange={e => { 
                                        setTimestamp(getDateWithAddition(parseInt(e.target.value))) 
                                    }} inputProps={{ min: 1 }}/>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <TimePicker sx={{ width: '100%' }} label="Time" value={startTime} onChange={setStartTime} />
                                    </LocalizationProvider>
                                </Stack>
                                <Button variant="contained" onClick={() => { scheduleInterview(application.id) }} disabled={startTime === null}>Schedule Now</Button>
                                </Stack>
                              </Popover>
                              </>) }
                        </Stack> )}
                    </Stack>
                </BasicCard>

              ))
            )} 
          </Stack>
        </Stack>
  )
}
export default ManageJobPost






