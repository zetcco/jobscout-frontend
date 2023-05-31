import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Checkbox, CircularProgress, FormControlLabel, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CenteredHeaderCard } from "../../cards/CenteredHeaderCard";
import { Controller, useForm } from "react-hook-form";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectAuthError, selectAuthLoading } from "../../../features/authSlice";
import { UploadArea } from '../../input/UploadArea'
import { useAddress } from "../../../hooks/useAddress";
import { requestOrganizationSignup } from "../../../features/authSlice";

/* eslint-disable no-useless-escape */

const OrganizationSignupForm = () => {
    const { register, control, handleSubmit, formState: { errors }, watch, setError }= useForm();
    const dispatch = useDispatch();
    const [confirmpwd , setConfirmpwd] = useState('');

    const [ agreed, setAgreed ] = useState(false)

    /* Form submission */
    const loading = useSelector(selectAuthLoading);
    const onSubmit=(data) =>{
        dispatch(requestOrganizationSignup(data))
        // console.log(data)
    }
    /* ---------------- */

    /* Error handling */
    const authError = useSelector(selectAuthError);
    useEffect(() => {
        if (authError && authError.status === 409) {
            setError('request.companyName')
            setError('request.email')
        } 
    }, [setError, authError])
    /* ---------------- */

    useEffect(() => {
        dispatch(clearError())
    }, [])

    const {countries, provice, cities} = useAddress(watch("request.address.country"), watch("request.address.province"));

    return (
        <CenteredHeaderCard title={"Register to IT-Scout"} >
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                            name="request.companyName"
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
                                error={errors.request?.companyName && true}
                            />)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="request.email"
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
                                error={errors.request?.email && true}
                            />)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="request.password"
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
                                error={errors.request?.password && true}
                            />)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                            <TextField
                                error={confirmpwd !== watch('request.password')}
                                value={confirmpwd}
                                onChange={(e)=>setConfirmpwd(e.target.value)}
                                label="Reenter Password" 
                                type="password"
                                variant="outlined"
                                placeholder = "Reenter your password"
                                fullWidth 
                            />
                    </Grid>

                    <Grid item xs={6} lg={4}>
                        <FormControl fullWidth error={errors.request?.address?.country && true}>
                            <InputLabel id="Org-registration-country-select-label">Country</InputLabel>
                            <Controller
                                name="request.address.country"
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
                        <FormControl fullWidth error={errors.request?.address?.province && true}>
                            <InputLabel id="Org-registration-province-select-label">Province</InputLabel>
                            <Controller
                                name="request.address.province"
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
                        <FormControl fullWidth error={errors.request?.address?.city && true}>
                            <InputLabel id="Org-registration-city-select-label">City</InputLabel>
                            <Controller
                                name="request.address.city"
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
                            name="request.address.town"
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
                            name="request.address.street"
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
                            name="request.address.steetNumber"
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
                        <UploadArea 
                            register={
                                register(
                                    "file",
                                    { required: true }
                                )} 
                            text={"Click here to Upload Business Registration"}
                            error={errors.file}
                            files={watch("file")}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel sx={{ height: '100%', ml: 1 }} label='I confirm that all the provided information is accurate and complete, and acknowledge that the necessary trademarks are in place.' control={
                            <Checkbox color='primary' checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                        }/>
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth disabled={loading || !agreed}  startIcon={ loading ? <CircularProgress sx={{ color: 'grey.400' }} size={20}/> : undefined }>Continue</Button>
                    </Grid>
                
                    </Grid>
            </form>
        </CenteredHeaderCard>

    );
}

export default OrganizationSignupForm;