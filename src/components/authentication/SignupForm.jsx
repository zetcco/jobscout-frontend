import React from "react";
import TextField from '@mui/material/TextField';
import { Button, Grid, Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CenteredHeaderCard } from "../cards/CenteredHeaderCard";
import { Link as RouterLink } from "react-router-dom";


const SignupForm = () => {
    return ( 
        <CenteredHeaderCard
            title={"Register to JobScout"}
            footer = {<Button variant="contained" fullWidth>Register</Button>}
        >
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="Signup-title-select-label">Title</InputLabel>
                                <Select
                                    labelId="Signup-title-select-label"
                                    id="Signup-title-select"
                                    label="Title"                             
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Mr.</MenuItem>
                                    <MenuItem value={20}>Mrs.</MenuItem>
                                    <MenuItem value={30}>Miss.</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>              
                        <Grid item xs={12} md={5}>            
                            <TextField 
                                id="outlined-basic" 
                                label="First Name" 
                                variant="outlined"
                                placeholder = "Enter your first name"
                                fullWidth 
                                required
                            />               
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <TextField 
                                id="outlined-basic" 
                                label="Last Name" 
                                variant="outlined"
                                placeholder = "Enter your last name"
                                fullWidth 
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined"
                                placeholder = "Enter your Email"
                                fullWidth 
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>   
                            <TextField 
                                id="outlined-basic" 
                                label="Contact Number" 
                                variant="outlined"
                                placeholder = "Enter your Contact No"
                                fullWidth 
                                required
                            />          
                        </Grid>

                        <Grid item xs={12} md={8}>   
                            <TextField 
                                label="Date of Birth" 
                                type="date"
                                placeholder = "Enter your Date of Birth"
                                InputLabelProps={{ shrink: true }}
                                fullWidth 
                                required
                            />        
                        </Grid>

                        <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="Signup-gender-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="Signup-gender-select-label"
                                        id="Signup-gender-select"
                                        label="Gender"                             
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Male</MenuItem>
                                        <MenuItem value={20}>Female</MenuItem>
                                        <MenuItem value={30}>Transgender</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6} lg={4}>
                            <TextField 
                                id="outlined-basic" 
                                label="Steet Number" 
                                variant="outlined"
                                placeholder = "Your street number"
                                fullWidth 
                                required
                            />
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel id="Org-registration-street-select-label">Street</InputLabel>
                                <Select
                                    labelId="Org-registration-town-select-label"
                                    id="Org-registration-street-select"
                                    label="Street"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item  xs={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel id="Org-registration-town-select-label">Town</InputLabel>
                                <Select
                                    labelId="Org-registration-town-select-label"
                                    id="Org-registration-town-select"
                                    label="Town"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel id="Org-registration-city-select-label">City</InputLabel>
                                <Select
                                    labelId="Org-registration-city-select-label"
                                    id="Org-registration-city-select"
                                    label="City"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel id="Org-registration-province-select-label">Province</InputLabel>
                                <Select
                                    labelId="Org-registration-city-select-label"
                                    id="Org-registration-city-select"
                                    label="Province"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel id="Org-registration-country-select-label">Country</InputLabel>
                                <Select
                                    labelId="Org-registration-country-select-label"
                                    id="Org-registration-country-select"
                                    label="Country"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    <Grid item xs={12}>   
                        <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            placeholder = "Enter your Password"
                            type = "password"
                            fullWidth 
                            required
                        />      
                    </Grid>

                    <Grid item xs={12}>   
                        <TextField 
                            id="outlined-basic" 
                            label="Password Conformation" 
                            variant="outlined"
                            placeholder = "Re-enter your Password"
                            type = "password"
                            fullWidth 
                            required
                        />     
                    </Grid>     
                </Grid>
            </Stack>
        </CenteredHeaderCard>
        
     );
}
 
export default SignupForm;