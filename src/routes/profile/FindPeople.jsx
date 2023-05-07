import { Box, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Popover, Select, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useEffect, useState } from 'react'
import { BasicCard } from 'components/cards/BasicCard';
import { AvatarWithInitials } from 'components/AvatarWithInitials';
import { ResponsiveIconButton } from 'components/ResponsiveIconButton';
import { PeopleTwoTone } from '@mui/icons-material';
import { useFetch } from 'hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export const FindPeople = () => {

    const fetch = useFetch()
    const navigate = useNavigate()
    const [resultUsers, setResultUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showFilters, setShowFilters] = useState(null)
    const [searchQuery, setSearchQuery] = useState({
        name: '',
        role: '',
        degrees: [],
        institutes: [],
        categories: [],
        skills: []
    })
    const [degrees, setDegrees] = useState([])
    const [institutes, setInstitues] = useState([])
    const [categories, setCategories] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() => {
        fetch('/qualifications/degrees', "GET", { onSuccess: (data) => { setDegrees(data) } })
        fetch('/qualifications/institutes', "GET", { onSuccess: (data) => { setInstitues(data) } })
        fetch('/category/', "GET", { onSuccess: (data) => { setCategories(data) } })
        fetch('/skills/', "GET", { onSuccess: (data) => { setSkills(data) } })
    }, [])

    const onSubmit = async () => {
        setLoading(true)
        const query = getQuery(searchQuery)
        await fetch(`/user/search?${query}`, "GET", { onSuccess: (data) => {
            setResultUsers(data)
        }, onError: (error) => {
            console.log(error)
        }})
        setLoading(false)
    }

    const isJobSeekerSelected = searchQuery.role === "ROLE_JOB_SEEKER"

    return (
        <Stack spacing={4}>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <TextField 
                label="Search for People" 
                variant="outlined"
                placeholder = {"Search by Name"}
                type="text"
                fullWidth
                value={searchQuery.name}
                onChange={e => { setSearchQuery(ex => ({...ex, name: e.target.value})) }} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                />  
                <Box>
                    <IconButton onClick={e => { setShowFilters(e.currentTarget) }}>
                        <FilterListIcon/>
                    </IconButton>
                    <Popover open={Boolean(showFilters)} onClose={() => { setShowFilters(null) }} anchorEl={showFilters} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Stack spacing={2} m={2}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel>User Type</InputLabel>
                                <Select value={searchQuery.role} onChange={e => { setSearchQuery(ex => ({ ...ex, role: e.target.value })) }} input={<OutlinedInput label={'User Type'}/>}>
                                    <MenuItem value={"ROLE_JOB_SEEKER"}>Job Seeker</MenuItem>
                                    <MenuItem value={"ROLE_JOB_CREATOR"}>Job Creator</MenuItem>
                                    <MenuItem value={"ROLE_ORGANIZATION"}>Organization</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 300 }} disabled={!isJobSeekerSelected}>
                                <InputLabel>Degrees</InputLabel>
                                <Select value={searchQuery.degrees} onChange={e => { 
                                    setSearchQuery(ex => ({...ex, degrees: e.target.value}))
                                }} input={<OutlinedInput label={'Degrees'}/>} multiple>
                                    {
                                        degrees.map((degree, index) => (
                                            <MenuItem value={degree.id} key={index}>{degree.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 300 }} disabled={!isJobSeekerSelected}>
                                <InputLabel>Institute</InputLabel>
                                <Select value={searchQuery.institutes} onChange={e => { 
                                    setSearchQuery(ex => ({...ex, institutes: e.target.value}))
                                }} input={<OutlinedInput label={'Institute'}/>} multiple>
                                    {
                                        institutes.map((institute, index) => (
                                            <MenuItem value={institute.id} key={index}>{institute.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 300 }} disabled={!isJobSeekerSelected}>
                                <InputLabel>Category</InputLabel>
                                <Select value={searchQuery.categories} onChange={e => { 
                                    setSearchQuery(ex => ({...ex, categories: e.target.value}))
                                }} input={<OutlinedInput label={'Category'}/>} multiple>
                                    {
                                        categories.map((category, index) => (
                                            <MenuItem value={category.id} key={index}>{category.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 300 }} disabled={!isJobSeekerSelected}>
                                <InputLabel>Skills</InputLabel>
                                <Select value={searchQuery.skills} onChange={e => { 
                                    setSearchQuery(ex => ({...ex, skills: e.target.value}))
                                }} input={<OutlinedInput label={'Skills'}/>} multiple>
                                    {
                                        skills.map((skill, index) => (
                                            <MenuItem value={skill.id} key={index}>{skill.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Stack>
                    </Popover>
                </Box>
                <Box>
                    <IconButton onClick={onSubmit}>
                        <SearchIcon/>
                    </IconButton>
                </Box>
            </Stack>
            <Stack>
                {
                    loading ? (
                        <Stack width={'100%'} justifyContent={'center'}>
                            <CircularProgress sx={{ m: 'auto' }}/>
                        </Stack>
                    ) : (
                        resultUsers === null ? (
                                <Typography width={'100%'} align={'center'} variant='h6' sx={{ fontStyle: 'italic' }} fontWeight={300}>You can search for users based on different criteria such as their Name, Role, Degree, Category, and Skills by using the <strong>Search Bar</strong> or the <strong>Filters</strong> above.</Typography>
                        ) : (
                            resultUsers.length === 0 ? (
                                <Typography width={'100%'} align={'center'}>No results found</Typography>
                            ) : (
                                <Stack direction={'column'} spacing={2}>
                                { resultUsers.map((user, index) => (
                                    <BasicCard sx={{ width: '100%' }} key={index}>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                                                <AvatarWithInitials size={{ xs: 60, md: 70 }} src={user.displayPicture} name={user.displayName}/>
                                                <Stack direction={'column'} spacing={0.2}>
                                                    <Typography variant='h5' fontWeight={600}>{user.displayName}</Typography>
                                                    <Typography fontSize={16}>{resolve_user_role(user.role)}</Typography> 
                                                </Stack>                      
                                            </Stack>
                                            <ResponsiveIconButton startIcon={<PeopleTwoTone/>} onClick={() => { navigate(`/users/${user.id}`) }}>View Profile</ResponsiveIconButton>
                                        </Stack>
                                    </BasicCard>
                                )) }
                                </Stack>
                            )
                        )
                    )
                }
            </Stack>
        </Stack>
    )
}

const getQuery = (query) => {
    let out_query = ""
    Object.keys(query).forEach(key => {
        out_query += query[key].length === 0 ? '' : `${key}=${
            ((typeof query[key] === 'string') ? query[key] : query[key].join(","))
        }&` 
    })
    return out_query;
}

const resolve_user_role = (role) => {
    switch (role) {
        case 'ROLE_JOB_CREATOR':
            return "Job Creator" 
        case 'ROLE_JOB_SEEKER':
            return "Job Seeker" 
        case 'ROLE_ORGANIZATION':
            return "Organization" 
        case 'ROLE_ADMIN':
            return "Admin" 
        default:
            return ""
    }
}