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
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, fetchCountries, fetchProvince, selectCities, selectCountries, selectProvince } from "../../../features/addressSlice";

const OrganizationSignupForm = () => {
    const {control, handleSubmit, formState: { errors }, watch }= useForm();
    const dispatch = useDispatch();

    const watchCountry = watch("country");
    const watchProvince = watch("province");

    const countries = useSelector(selectCountries);
    const provice = useSelector(selectProvince);
    const cities = useSelector(selectCities);

    const onSubmit=(data) =>{
        console.log(data)
    }

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProvince(watchCountry))
    }, [dispatch, watchCountry])

    useEffect(() => {
        dispatch(fetchCities(watchProvince))
    }, [dispatch, watchProvince])

    return (
        <CenteredHeaderCard
            title={"Register to JobScout"}
        >
                <Stack spacing = {2} sx = {{width:'100%'}}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller 
                                name="companyName"
                                rules={ { required: true } }
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField
                                    {...field}
                                    label="Company Name"
                                    variant="outlined"
                                    placeholder="Enter your company name"
                                    fullWidth
                                    error={errors.companyName && true}
                                />)}
                           />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="companyEmail"
                                rules={ { required: true } }
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>( 
                                <TextField
                                    {...field}
                                    label="Company Email"
                                    variant="outlined"
                                    placeholder="Enter your company Email"
                                    fullWidth
                                    error={errors.companyEmail && true}
                                />)}
                            />
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth error={errors.country && true}>
                                <InputLabel id="Org-registration-country-select-label">Country</InputLabel>
                                <Controller
                                    name="country"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={ ({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="Org-registration-country-select-label"
                                            label="Country"
                                        >
                                            { 
                                                countries.map( (country, index) => (
                                                    <MenuItem value={country} key={index}>{country}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth error={errors.province && true}>
                                <InputLabel id="Org-registration-province-select-label">Province</InputLabel>
                                <Controller
                                    name="province"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={ ({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="Org-registration-province-select-label"
                                            label="Province"
                                        >
                                            { 
                                                provice.map( (provice, index) => (
                                                    <MenuItem value={provice} key={index}>{provice}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth error={errors.city && true}>
                                <InputLabel id="Org-registration-city-select-label">City</InputLabel>
                                <Controller
                                    name="city"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={ ({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="Org-registration-city-select-label"
                                            label="City"
                                        >
                                            { 
                                                cities.map( (city, index) => (
                                                    <MenuItem value={city} key={index}>{city}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item  xs={6} lg={4}>
                            <Controller
                                name="town"
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField 
                                    {...field}
                                    label="Town" 
                                    variant="outlined"
                                    placeholder = "Your Town"
                                    fullWidth 
                                    error={errors.town && true}
                                />)}
                            />
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <Controller
                                name="street"
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField 
                                    {...field}
                                    label="Steet" 
                                    variant="outlined"
                                    placeholder = "Your Street"
                                    fullWidth 
                                    error={errors.street && true}
                                />)}
                            />
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <Controller
                                name="steetNumber"
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField 
                                    {...field}
                                    label="Steet Number" 
                                    variant="outlined"
                                    placeholder = "Your street number"
                                    fullWidth 
                                    error={errors.steetNumber && true}
                                />)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DashedArea
                                text = {'Click to upload Business Registration'}
                                icon = {<UploadIcon fontSize="large"/>}
                            ></DashedArea>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>Continue</Button>
                        </Grid>
                    
                     </Grid>
                </form>
                </Stack>
        </CenteredHeaderCard>

    );
}

export default OrganizationSignupForm;