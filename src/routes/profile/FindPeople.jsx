import { Autocomplete, Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Popover, Select, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useEffect, useState } from 'react'
import { BasicCard } from 'components/cards/BasicCard';
import { AvatarWithInitials } from 'components/AvatarWithInitials';
import { ResponsiveIconButton } from 'components/ResponsiveIconButton';
import { Clear, PeopleTwoTone, Save } from '@mui/icons-material';
import { useFetch } from 'hooks/useFetch';
import { useNavigate, useSearchParams } from 'react-router-dom';

const init_search_query = {
    name: '',
    role: '',
    degrees: [],
    institutes: [],
    categories: [],
    skills: []
}

export const FindPeople = () => {

    const fetch = useFetch()
    const navigate = useNavigate()
    const [resultUsers, setResultUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showFilters, setShowFilters] = useState(null)
    const [searchQuery, setSearchQuery] = useState(init_search_query)
    const [degrees, setDegrees] = useState([])
    const [institutes, setInstitues] = useState([])
    const [categories, setCategories] = useState([])
    const [skills, setSkills] = useState([])

    const [ routerSearchParams, setRouterSearchParams ] = useSearchParams()

    const onSubmit = async () => {
        const query = getQuery(searchQuery)
        submitSearch(query)
    }

    const submitSearch = async (query) => {
        setLoading(true)
        setRouterSearchParams(query)
        await fetch(`/user/search?${query}`, "GET", { onSuccess: (data) => {
            setResultUsers(data)
        }, onError: (error) => {
            console.log(error)
        }, errorMsg: "Failed to perform search"})
        setLoading(false)
    }

    useEffect(() => {
        fetch('/qualifications/degrees', "GET", { onSuccess: (data) => { setDegrees(data) } })
        fetch('/qualifications/institutes', "GET", { onSuccess: (data) => { setInstitues(data) } })
        fetch('/category/', "GET", { onSuccess: (data) => { setCategories(data) } })
        fetch('/skills/', "GET", { onSuccess: (data) => { setSkills(data) } })
        if (routerSearchParams.toString() !== '')
            submitSearch(routerSearchParams.toString())

    }, [])

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
                onKeyDown={e => { if (e.keyCode === 13) onSubmit() }}
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
                            <FormControl sx={{ width: { xs: 300, sm: 350 } }}>
                                <InputLabel>User Type</InputLabel>
                                <Select value={searchQuery.role} onChange={e => { setSearchQuery(ex => ({ ...ex, role: e.target.value })) }} input={<OutlinedInput label={'User Type'}/>}>
                                    <MenuItem value={"ROLE_JOB_SEEKER"}>Job Seeker</MenuItem>
                                    <MenuItem value={"ROLE_JOB_CREATOR"}>Job Creator</MenuItem>
                                    <MenuItem value={"ROLE_ORGANIZATION"}>Organization</MenuItem>
                                </Select>
                            </FormControl>
                            <Autocomplete
                                sx={{ width: { xs: 300, sm: 350 } }}
                                autoComplete
                                multiple
                                value={searchQuery.degrees}
                                onChange={(e, value) => { setSearchQuery(ex => ({...ex, degrees: value})) }} 
                                disabled={!isJobSeekerSelected}
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
                                sx={{ width: { xs: 300, sm: 350 } }}
                                autoComplete
                                multiple
                                value={searchQuery.institutes}
                                onChange={(e, value) => { setSearchQuery(ex => ({...ex, institutes: value})) }} 
                                disabled={!isJobSeekerSelected}
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
                                sx={{ width: { xs: 300, sm: 350 } }}
                                autoComplete
                                multiple
                                value={searchQuery.categories}
                                onChange={(e, value) => { setSearchQuery(ex => ({...ex, categories: value})) }} 
                                disabled={!isJobSeekerSelected}
                                options={categories}
                                renderInput={params => <TextField {...params} label='Categories'/>}
                                getOptionLabel={option => option.name}
                                renderOption={(props, option) => (
                                    <Box component={'li'} {...props} value={option.id}>
                                        {option.name}
                                    </Box>
                                )}
                            />
                            <Autocomplete
                                sx={{ width: { xs: 300, sm: 350 } }}
                                autoComplete
                                multiple
                                value={searchQuery.skills}
                                onChange={(e, value) => { setSearchQuery(ex => ({...ex, skills: value})) }} 
                                disabled={!isJobSeekerSelected}
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
                                <Button onClick={() => { setShowFilters(null) }} startIcon={<Save/>}>Save</Button>
                            </Stack>
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
        console.log(query[key])
        out_query += query[key].length === 0 ? '' : `${key}=${
            ((typeof query[key] === 'string') ? query[key] : query[key].map(obj => obj.id).join(","))
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