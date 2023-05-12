import React, { useState , useEffect } from "react";
import { Stack } from "@mui/system";
import { TextField, Box, Popover, IconButton, Alert, AlertTitle } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterPosts } from "../../components/job_postings/posts/FilterPosts";
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { BasicCard } from "../../components/cards/BasicCard";
import SmallPanel from "../../components/SmallPanel";
import SubCategories from "../../components/job_postings/posts/SubCategories";
import { RouterLink } from "../../components/RouterLink";
import { serverClient } from "features/authSlice";

export const JobPosts = () => {

    {/*job post function*/}
    const [jobPosts , setjobPosts] = useState([]);
    const [error , setError] = useState('');
    useEffect(() =>{
        const fetchJobPosts = async () => {
            try{
                const response = await serverClient.get('/jobpost?page=0&size=15')
                console.log(response.data);
                setjobPosts(response.data);
            }catch(error) {
                setError(error.response.data)
                console.log(error);
            }
        }
        fetchJobPosts()
    } , [])

    const [ filterValues, setFilterValues ] = useState({
        category: '',
        skill: '',
        status: '',
        type: ''
    })

    useEffect(()=>{
        const fetchJobPostsByCategoryId = async () => {
            try{
                const categoryResponse = await serverClient.get(`/jobpost/category/${filterValues.category}`);
                const statusResponse = await serverClient.get(`jobpost/status?val=${filterValues.status}`);
                const typeResponse = await serverClient.get(`jobpost/type?val=${filterValues.type}`);
                console.log(categoryResponse.data);
                console.log(statusResponse.data);
                console.log(typeResponse.data);
                setjobPosts(categoryResponse.data);
                setjobPosts(statusResponse.data);
                setjobPosts(typeResponse.data);
            }catch(error){
                console.log(error.response.data);
                console.log(error);
            }
        }
        fetchJobPostsByCategoryId();
    } , [filterValues])

    
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    console.log(filterValues)
    return ( 
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Stack>
            { error && (
                  <Alert severity="error">
                    <AlertTitle>Error!</AlertTitle>
                    <strong>{error.message}</strong>
                  </Alert>
              )}
            </Stack>
            <Stack direction={"row"} spacing={2} alignItems="center">
                <Box sx={{ height: '100%', flexGrow: 1 }}>
                    <TextField 
                    id="outlined-basic" 
                    label="Search for jobs" 
                    variant="outlined"
                    placeholder = "Example-React Developer"
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
                <Box sx={{ flexShrink: 1 }}>
                    <IconButton variant='contained' sx={{ height: '100%', width: '100%' }} size='large'>
                        <SearchIcon/>
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
                    <IconButton variant="contained" size="large" aria-describedby={id} onClick={handleClick}>
                        <FilterListIcon/>
                    </IconButton>
                </Box>
            </Stack>

            <Stack direction={'row'} spacing={{ lg: 2, xs: 0 }}>
                <Box sx={{ flexShrink: 0, flexGrow: 3, display: { xs: 'none', lg: 'block' } }}>
                    <Stack direction={"column"} spacing={2}>                           
                            <SmallPanel mainTitle = {'Filter By'} children = {<FilterPosts setFilterValues={setFilterValues} filterValues={filterValues}/>} /> 
                            <SmallPanel mainTitle = {'Filter By'} children = {<SubCategories/>} />                                
                    </Stack>
                </Box>

                {/* This is the Popover component of the filters on smaller screens  */}
                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                    <BasicCard>
                        <Stack direction={"column"} spacing={2}>                           
                            <SmallPanel mainTitle = {'Filter By'} children = {<FilterPosts setFilterValues={setFilterValues} filterValues={filterValues}/>} /> 
                            <SmallPanel mainTitle = {'Filter By'} children = {<SubCategories/>} />                                
                        </Stack>
                    </BasicCard>
                </Popover>
                <Stack>
                    <Box sx={{ flexGrow: 9 }}>                           
                        <Stack direction={'column'} spacing={2} flexGrow = {1}>
                            {
                            jobPosts.map((jobPost) =>
                            <RouterLink to={`/posts/${jobPost.id}`}>
                                <SingleJobPost 
                                summary={true}
                                title = { jobPost.title }
                                type = { jobPost.type }
                                status = {jobPost.status}
                                questionaryId={ jobPost.questionaryId }
                                >
                                    { jobPost.description }
                                </SingleJobPost>
                            </RouterLink>)
                             }
                        </Stack>
                    </Box>
                </Stack>
            </Stack>              
        </Stack>
     );
}