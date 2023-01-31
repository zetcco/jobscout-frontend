import React from "react";
import TextField from '@mui/material/TextField';
import { Button, Grid, Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CenteredHeaderCard } from "../../cards/CenteredHeaderCard";
import { DashedArea } from "../../input/DashedArea";
import UploadIcon from '@mui/icons-material/FileUpload';
import { Link as RouterLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

const OrganizationSignupForm = () => {
    const [city, setCity] = React.useState('')
    const [province, setProvince] = React.useState('')
    const [country, setCountry] = React.useState('')

    const {control, handleSubmit, formState: { errors } }= useForm();

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    
    const onSubmit=(data) =>{
        console.log(data)
    }

    return (
        <CenteredHeaderCard
            footer={<Button variant="contained" fullWidth>Continue</Button>}
            title={"Register to JobScout"}
        >
                <Stack spacing = {2} sx = {{width:'100%'}}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller 
                            name="companyName"
                            rules={ ({ required: true })}
                            control={control}
                            defaultValue=""
                            render={ ({field}) =>(
                            <TextField
                                id="outlined-basic"
                                label="Company Name"
                                variant="outlined"
                                placeholder="Enter your company name"
                                fullWidth
                                error={errors.companyName && true}
                            />
                            )}

                           />

                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                            name="companyEmail"
                            rules={ ({ required: true })}
                            control={control}
                            defaultValue=""
                            render={ ({field}) =>( 
                            <TextField
                                id="outlined-basic"
                                label="Company Email"
                                variant="outlined"
                                placeholder="Enter your company Email"
                                fullWidth
                                error={errors.companyEmail && true}
                            />
                            )}

                            />

                           </Grid>

                        <Grid item xs={6} lg={4}>
                            <Controller
                            name="steetNumber"
                            rules={ ({required: true})}
                            control={control}
                            defaultValue=""
                            render={ ({field}) =>(
                            <TextField 
                                id="outlined-basic" 
                                label="Steet Number" 
                                variant="outlined"
                                placeholder = "Your street number"
                                fullWidth 
                                error={errors.steetNumber && true}
                            />) }
                            />
                            
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel id="Org-registration-street-select-label">Street</InputLabel>
                                <Select
                                    labelId="Org-registration-town-select-label"
                                    id="Org-registration-street-select"
                                    value={province}
                                    label="Street"
                                    onChange={handleProvinceChange}
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
                                    value={country}
                                    label="Town"
                                    onChange={handleCountryChange}
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
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth>
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
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <DashedArea
                                text = {'Click to upload Business Registration'}
                                icon = {<UploadIcon fontSize="large"/>}
                            ></DashedArea>
                        </Grid>

                     </Grid>
                </Stack>
        </CenteredHeaderCard>

    );
}

export default OrganizationSignupForm;