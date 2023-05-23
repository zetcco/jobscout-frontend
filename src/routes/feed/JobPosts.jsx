import React, { useState , useEffect } from "react";
import { Stack } from "@mui/system";
import { TextField, Box, Popover, IconButton, Alert, AlertTitle, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button, Autocomplete, FormControlLabel, Checkbox, Avatar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FilterListIcon from '@mui/icons-material/FilterList';
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { RouterLink } from "../../components/RouterLink";
import { useFetch } from "hooks/useFetch";
import { ResponsiveIconButton } from "components/ResponsiveIconButton";
import { Clear, Save, Search } from "@mui/icons-material";
import { getQuery } from "hooks/getQuery";
import axios from "axios";

const init_search_query = {
    description: '',
    type: '',
    degrees: [],
    institutes: [],
    categories: [],
    skills: [],
    organization: ''
}

export const JobPosts = () => {

    const [showFilters, setShowFilters] = useState(null)
    const [searchQuery, setSearchQuery] = useState(init_search_query)
    const [jobPosts , setjobPosts] = useState([]);
    const [categories, setCategories] = useState([])
    const [skills, setSkills] = useState([])
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [fetchOrgsLoading, setFetchOrgsLoading] = useState(false);

    const fetch = useFetch()

    useEffect(() =>{
        fetch('/category/', "GET", { onSuccess: setCategories })
        fetch('/skills/', "GET", { onSuccess: setSkills })
        fetch(`/jobpost/search?status=STATUS_ACTIVE`, "GET", { onSuccess: setjobPosts })
    } , [])

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

    const onSubmit = () => {
        fetch(`/jobpost/search?${getQuery(searchQuery)}status=STATUS_ACTIVE`, "GET", { onSuccess: setjobPosts })
    }

    return ( 
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Stack>
            </Stack>
            <Stack direction={"row"} spacing={2} alignItems="center">
                <Box sx={{ height: '100%', flexGrow: 1 }}>
                    <TextField 
                    label="Search for jobs" 
                    variant="outlined"
                    placeholder = "Example-React Developer"
                    value={searchQuery.description}
                    onChange={e => { setSearchQuery(ex => ({...ex, description: e.target.value})) }} 
                    onKeyDown={e => { if (e.keyCode === 13) onSubmit() }}
                    type="text"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                    />  
                </Box>
                <Box>
                    <Button startIcon={<FilterListIcon/>} onClick={e => { setShowFilters(e.currentTarget) }}>Filters</Button>
                    <Popover open={Boolean(showFilters)} onClose={() => { setShowFilters(null) }} anchorEl={showFilters} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Stack spacing={2} m={2}>
                            <FormControl sx={{ width: { xs: 300, sm: 350 } }}>
                                <InputLabel>Select Type</InputLabel>
                                <Select value={searchQuery.type} onChange={e => { setSearchQuery(ex => ({ ...ex, type: e.target.value })) }} input={<OutlinedInput label={'Select Type'}/>}>
                                    <MenuItem value={"TYPE_FREELANCE"}>Freelance</MenuItem>
                                    <MenuItem value={"TYPE_PERMANENT"}>Permanent</MenuItem>
                                    <MenuItem value={"TYPE_PART_TIME"}>Part Time</MenuItem>
                                </Select>
                            </FormControl>
                            <Autocomplete
                                sx={{ width: { xs: 300, sm: 350 } }}
                                autoComplete
                                multiple
                                value={searchQuery.categories}
                                onChange={(e, value) => { setSearchQuery(ex => ({...ex, categories: value})) }} 
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
                                options={skills}
                                renderInput={params => <TextField {...params} label='Skills'/>}
                                getOptionLabel={option => option.name}
                                renderOption={(props, option) => (
                                    <Box component={'li'} {...props} value={option.id}>
                                        {option.name}
                                    </Box>
                                )}
                            />
                            <Autocomplete
                                value={value}
                                inputValue={inputValue}
                                onChange={(e, value) => { 
                                    setValue(value) 
                                    setSearchQuery(ex => ({...ex, organization: value ? value.id : null})) 
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
                                        label="Search by Company"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                                {params.InputProps.startAdornment}
                                            </InputAdornment>
                                            )
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
                            <FormControlLabel sx={{ height: '100%', ml: 1 }} label='Urgent' control={
                                <Checkbox color='primary' checked={searchQuery.urgent} onChange={e => setSearchQuery(ex => ({...ex, urgent: e.target.checked}))} />
                            }/>
                            <Stack width={'100%'} direction={'row'} justifyContent={'right'}>
                                <Button onClick={() => { setSearchQuery(init_search_query) }} color='error' startIcon={<Clear/>}>Clear</Button>
                                <Button onClick={() => { 
                                    setShowFilters(null) 
                                    onSubmit()
                                }} startIcon={<Save/>}>Save</Button>
                            </Stack>
                        </Stack>
                    </Popover>
                </Box>
                <ResponsiveIconButton startIcon={<Search/>} onClick={onSubmit}>Search</ResponsiveIconButton>
            </Stack>

            <Stack direction={'row'} spacing={{ lg: 2, xs: 0 }}>
                <Stack direction={'column'} spacing={2} flexGrow = {1}>
                    {
                    jobPosts.map((jobPost) =>
                    <RouterLink to={`/posts/${jobPost.id}`} key={jobPost.id}>
                        <SingleJobPost 
                        summary={true}
                        title = { jobPost.title }
                        type = { jobPost.type }
                        status = {jobPost.status}
                        questionaryId={ jobPost.questionaryId }
                        urgent={jobPost.urgent}
                        >
                            { jobPost.description }
                        </SingleJobPost>
                    </RouterLink>
                    ) }
                </Stack>
            </Stack>              
        </Stack>
     );
}