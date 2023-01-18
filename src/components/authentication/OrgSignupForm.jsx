import React from "react";
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const OrgSignupForm = () => {

    const paperStyle = { padding: '60px', margin: '20px auto', width: '700px', fontFamily: 'sans-serif' }
    const textFieldStyle = { margin: '10px auto' }
    const [city, setCity] = React.useState('')
    const [province, setProvince] = React.useState('')
    const [country, setCountry] = React.useState('')

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    return (
        <Grid container Spacing={2}>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                        <Grid>
                            <TextField
                                id="outlined-basic"
                                label="Company Name"
                                variant="outlined"
                                placeholder="Enter your company name"
                                fullWidth
                                required
                                style={textFieldStyle}
                            />
                        </Grid>

                        <Grid>
                            <TextField
                                id="outlined-basic"
                                label="Company Email"
                                variant="outlined"
                                placeholder="Enter your company Email"
                                type="password"
                                fullWidth
                                required
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid container Spacing={2}>
                            <Grid item xs = {4}>
                                <FormControl sx = {{s:1, minWidth:'230px'}}>
                                    <InputLabel id="Org-registration-city-select-label">City</InputLabel>
                                    <Select
                                        labelId="Org-registration-city-select-label"
                                        id="Org-registration-city-select"
                                        value={city}
                                        label="City"
                                        onChange={handleCityChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Select your city</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs = {4}>
                                <FormControl sx = {{s:1, minWidth:'230px'}}>
                                    <InputLabel id="Org-registration-province-select-label">Province</InputLabel>
                                    <Select
                                        labelId="Org-registration-city-select-label"
                                        id="Org-registration-city-select"
                                        value={province}
                                        label="Province"
                                        onChange={handleProvinceChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Select your province</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs = {4}>
                                <FormControl sx = {{s:1, minWidth:'230px'}}>
                                    <InputLabel id="Org-registration-country-select-label">Country</InputLabel>
                                    <Select
                                        labelId="Org-registration-country-select-label"
                                        id="Org-registration-country-select"
                                        value={country}
                                        label="Country"
                                        onChange={handleCountryChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Select your country</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>  
                        
                        <Grid>
                            <Button variant="contained" sx={{ co2or: '#FFFFFF', backgroundColor: '#28AF38', borderRadius: '20px', margin: '10px auto' }} fullWidth>Login</Button>
                        </Grid>
                </Grid>
            </Paper>
        </Grid>

    );
}

export default OrgSignupForm;