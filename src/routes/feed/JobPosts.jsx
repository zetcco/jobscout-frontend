import React from "react";
import { Stack } from "@mui/system";
import { Grid, TextField,Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FilterPosts from "../../components/job_postings/posts/FilterPosts";
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { BasicCard } from "../../components/BasicCard";
import SmallPanel from "../../components/SmallPanel";
import SubCategories from "../../components/job_postings/posts/SubCategories";


export const JobPosts = () => {
    return ( 
        <BasicCard>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs = {10}>
                        <TextField 
                        id="outlined-basic" 
                        label="Search for jobs" 
                        variant="outlined"
                        placeholder = "Example-React Developer"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                         />  
                    </Grid>

                    <Grid item xs={2}>
                        <Button variant='contained' fullWidth size='large'>Search</Button>
                    </Grid>    

                </Grid> 

                <Grid container>
                    <Stack direction={'row'} spacing ={4}>
                        <Grid item xs={3}>                           
                            <Stack direction={'column'} spacing={4}>
                               <SmallPanel
                                  mainTitle = {'Title'}
                                  children = {<FilterPosts/>}
                               /> 
                               <SmallPanel
                                  mainTitle = {'FilterBy'}
                                  children = {<SubCategories/>}
                               />                                
                            </Stack>
                        </Grid>
                        <Grid item xs={9}>                           
                            <Stack direction={'column'} spacing={4}>
                                <SingleJobPost/>
                                <SingleJobPost/>
                                <SingleJobPost/>
                            </Stack>
                        </Grid>
                    </Stack>
                </Grid>
            </Stack>              
        </BasicCard>
     );
}