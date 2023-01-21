import React, { useState } from "react";
import { Stack } from "@mui/system";
import { TextField,Button, Box, Popover, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterPosts from "../../components/job_postings/posts/FilterPosts";
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { BasicCard } from "../../components/BasicCard";
import SmallPanel from "../../components/SmallPanel";
import SubCategories from "../../components/job_postings/posts/SubCategories";
import { Link } from "react-router-dom";
import { RouterLink } from "../../components/RouterLink";


export const JobPosts = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return ( 
        <BasicCard>
            <Stack spacing={2} sx={{ width: '100%' }}>
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
                        <IconButton variant='contained' fullWidth sx={{ height: '100%', width: '100%' }} size='large'>
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
                                <SmallPanel mainTitle = {'Filter By'} children = {<FilterPosts/>} /> 
                                <SmallPanel mainTitle = {'Filter By'} children = {<SubCategories/>} />                                
                        </Stack>
                    </Box>

                    {/* This is the Popover component of the filters on smaller screens  */}
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                        <BasicCard>
                            <Stack direction={"column"} spacing={2}>                           
                                <SmallPanel mainTitle = {'Filter By'} children = {<FilterPosts/>} /> 
                                <SmallPanel mainTitle = {'Filter By'} children = {<SubCategories/>} />                                
                            </Stack>
                        </BasicCard>
                    </Popover>

                    <Box sx={{ flexGrow: 9 }}>                           
                        <Stack direction={'column'} spacing={2}>
                            <RouterLink to="/posts/1"><SingleJobPost sx={{ 
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.grey[100],
                                }
                             }}/></RouterLink>
                            <RouterLink to="/posts/1"><SingleJobPost sx={{ 
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.grey[100],
                                }
                             }}/></RouterLink>
                            <RouterLink to="/posts/1"><SingleJobPost sx={{ 
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.grey[100],
                                }
                             }}/></RouterLink>
                            <RouterLink to="/posts/1"><SingleJobPost sx={{ 
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.grey[100],
                                }
                             }}/></RouterLink>
                            <RouterLink to="/posts/1"><SingleJobPost sx={{ 
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.grey[100],
                                }
                             }}/></RouterLink>
                            <RouterLink to="/posts/1"><SingleJobPost sx={{ 
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.grey[100],
                                }
                             }}/></RouterLink>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>              
        </BasicCard>
     );
}