import React from "react";
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Grid, Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CenteredHeaderCard } from "../../../cards/CenteredHeaderCard";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, fetchCountries, fetchProvince, selectCities, selectCountries, selectProvince } from "../../../../features/addressSlice";
import { requestJobSeekerSignup, selectAuthError, selectAuthLoading } from "../../../../features/authSlice";

/* eslint-disable no-useless-escape */

const SeekerSignupForm = () => {
    const {control, handleSubmit, formState: { errors }, watch, setError }= useForm();
    const dispatch = useDispatch();

    const loading = useSelector(selectAuthLoading);

    const watchCountry = watch("address.country");
    const watchProvince = watch("address.province");

    /* Error handling */
    const authError = useSelector(selectAuthError);
    useEffect(() => {
        if (authError && authError.status === 409) {
            setError('companyName')
            setError('email')
        } 
    }, [setError, authError])
    /* ---------------- */

    const countries = useSelector(selectCountries);
    const provice = useSelector(selectProvince);
    const cities = useSelector(selectCities);

    const onSubmit=(data) =>{
        dispatch(requestJobSeekerSignup(data))
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
            <Stack spacing={2} sx={{ width: '100%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {
                                authError && 
                                (
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        <strong>{authError.message}</strong>
                                    </Alert>
                                )
                            }
                        </Grid>
                        <Grid item xs={12} md={4} xl={2}>
                            <FormControl fullWidth error={errors.title && true}>
                                <InputLabel id="Org-registration-province-select-label">Title</InputLabel>
                                <Controller
                                    name="title"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={ ({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="Org-registration-province-select-label"
                                            label="Title"
                                        >
                                            <MenuItem value="MR">Mr.</MenuItem>
                                            <MenuItem value="MRS">Mrs.</MenuItem>
                                            <MenuItem value="MISS">Miss</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>              
                        <Grid item xs={12} md={4} xl={5}>            
                            <Controller
                                name="firstName"
                                rules={{ required: true }}
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField 
                                        {...field}
                                        label="First Name" 
                                        variant="outlined"
                                        placeholder = "Enter your first name"
                                        error={errors.firstName && true}
                                        fullWidth 
                                    />               
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} xl={5}>
                            <Controller
                                name="lastName"
                                rules={{ required: true }}
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField 
                                        {...field}
                                        label="Last Name" 
                                        variant="outlined"
                                        error={errors.lastName && true}
                                        placeholder = "Enter your Last Name"
                                        fullWidth 
                                    />               
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="email"
                                rules={ { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ } }
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField 
                                        {...field}
                                        label="Email" 
                                        variant="outlined"
                                        error={errors.email && true}
                                        placeholder = "Enter your Email"
                                        fullWidth 
                                    />               
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>   
                            <Controller
                                name="contactNo"
                                rules={{ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im }}
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField 
                                        {...field}
                                        error={errors.contactNo && true}
                                        label="Contact Number" 
                                        variant="outlined"
                                        placeholder = "Enter Contact Number"
                                        fullWidth 
                                    />               
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>   
                            <Controller
                                name="dob"
                                rules={{ required: true }}
                                control={control}
                                defaultValue=""
                                render={( { field } ) => ( 
                                    <TextField 
                                        {...field}
                                        error={errors.dob && true}
                                        label="Date of Birth" 
                                        type="date"
                                        placeholder = "Enter your Date of Birth"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth 
                                    />        
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth error={errors.gender && true}>
                                <InputLabel id="Org-registration-province-select-label">Gender</InputLabel>
                                <Controller
                                    name="gender"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={ ({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="Org-registration-province-select-label"
                                            label="Gender"
                                        >
                                            <MenuItem value="MALE">Male</MenuItem>
                                            <MenuItem value="FEMALE">Female</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>   
                            <Controller
                                name="password"
                                rules={{ required: true }}
                                control={control}
                                defaultValue=""
                                render={ ({ field }) => (
                                    <TextField 
                                        {...field}
                                        error={errors.password && true}
                                        label="Password" 
                                        type="password"
                                        variant="outlined"
                                        placeholder = "Enter your password"
                                        fullWidth 
                                    />               
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <FormControl fullWidth error={errors.request?.address?.country && true}>
                                <InputLabel id="Org-registration-country-select-label">Country</InputLabel>
                                <Controller
                                    name="address.country"
                                    // rules={{ required: true }}
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
                            <FormControl fullWidth error={errors.request?.address?.province && true}>
                                <InputLabel id="Org-registration-province-select-label">Province</InputLabel>
                                <Controller
                                    name="address.province"
                                    // rules={{ required: true }}
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
                            <FormControl fullWidth error={errors.request?.address?.city && true}>
                                <InputLabel id="Org-registration-city-select-label">City</InputLabel>
                                <Controller
                                    name="address.city"
                                    // rules={{ required: true }}
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
                                name="address.town"
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField 
                                    {...field}
                                    label="Town" 
                                    variant="outlined"
                                    placeholder = "Your Town"
                                    fullWidth 
                                />)}
                            />
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <Controller
                                name="address.street"
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField 
                                    {...field}
                                    label="Steet" 
                                    variant="outlined"
                                    placeholder = "Your Street"
                                    fullWidth 
                                />)}
                            />
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <Controller
                                name="address.steetNumber"
                                control={control}
                                defaultValue=""
                                render={ ({field}) =>(
                                <TextField 
                                    {...field}
                                    label="Steet Number" 
                                    variant="outlined"
                                    placeholder = "Your street number"
                                    fullWidth 
                                />)}
                            />
                        </Grid>

                    <Grid item xs={12}>   
                        <Button type="submit" variant="contained" fullWidth disabled={loading === 'loading'}>Continue</Button>
                    </Grid>     
                    </Grid>
            </form>
            </Stack>
        </CenteredHeaderCard>
        
     );
}
 
export default SeekerSignupForm;