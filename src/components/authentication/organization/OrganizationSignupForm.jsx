import React from "react";
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Grid, Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CenteredHeaderCard } from "../../cards/CenteredHeaderCard";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError, selectAuthLoading } from "../../../features/authSlice";
import { requestOrganizationSignup } from '../../../features/authSlice'
import { useState } from 'react'
import { UploadArea } from '../../input/UploadArea'
import { useAddress } from "../../../hooks/useAddress";

/* eslint-disable no-useless-escape */

const OrganizationSignupForm = () => {
    const {control, handleSubmit, formState: { errors }, watch, setError }= useForm();
    const dispatch = useDispatch();

    /* Form submission */
    const loading = useSelector(selectAuthLoading);
    const onSubmit=(data) =>{
        dispatch(requestOrganizationSignup(data))
    }
    /* ---------------- */

    /* Error handling */
    const authError = useSelector(selectAuthError);
    useEffect(() => {
        if (authError && authError.status === 409) {
            setError('companyName')
            setError('email')
        } 
    }, [setError, authError])
    /* ---------------- */
    
    const [ file, setFile ] = useState();

    const {countries, provice, cities} = useAddress(watch("address.country"), watch("address.province"));

    return (
        <CenteredHeaderCard title={"Register to JobScout"} >
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
                    <Grid item xs={12}>
                        <Controller 
                            name="companyName"
                            rules={ { required: true, maxLength: 20 } }
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
                            name="email"
                            rules={ { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ } }
                            control={control}
                            defaultValue=""
                            render={ ({field}) =>( 
                            <TextField
                                {...field}
                                label="Company Email"
                                variant="outlined"
                                placeholder="Enter your company Email"
                                fullWidth
                                error={errors.email && true}
                            />)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="password"
                            rules={ { required: true } }
                            control={control}
                            defaultValue=""
                            render={ ({field}) =>( 
                            <TextField
                                {...field}
                                label="Password"
                                variant="outlined"
                                type="password"
                                placeholder="Enter your Password"
                                fullWidth
                                error={errors.password && true}
                            />)}
                        />
                    </Grid>

                    <Grid item xs={6} lg={4}>
                        <FormControl fullWidth error={errors.address && true}>
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
                        <FormControl fullWidth error={errors.address && true}>
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
                        <FormControl fullWidth error={errors.address && true}>
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
                        <UploadArea text={"Click here to Business Registration"} handleFile={(data) => { setFile(data) }}/>
                        { file && (
                        <Typography>{ file.name }</Typography>
                        ) }
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth disabled={loading && true}>Continue</Button>
                    </Grid>
                
                    </Grid>
            </form>
        </CenteredHeaderCard>

    );
}

export default OrganizationSignupForm;