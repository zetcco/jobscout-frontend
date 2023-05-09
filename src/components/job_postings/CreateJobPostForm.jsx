import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle, Autocomplete, Box, Typography, FormControlLabel, Checkbox} from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';
import { selectAuthUserToken, serverClient } from 'features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BasicCard } from 'components/cards/BasicCard';
import { Controller, useForm } from 'react-hook-form';
import { async } from 'q';
import { AddQuestionary } from 'components/authentication/user/job_seeker/questionaries/AddQuestionary';

export const CreateJobPostForm = () => {

  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [categories , setCategories] = useState([]);
  const [skills , setSkills] = useState([]);
  const [error , setError] = useState(null);
  const [data , setData] = useState({
    dueDate:"",
    title: "",
    description: "",
    type:"",
    urgent:"",
    status:"",
    category:{ id: null, name: '' },
  })
  const [addScreeningTest, setAddScreeningTest] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchCategories = async () => {
        try {
            let response = await serverClient.get('/category/')
            setCategories(response.data)
            response = await serverClient.get('/skills/')
            setSkills(response.data)
        } catch (error) {
            setError(error.response.data);
            console.error(error);
        }
    }
    fetchCategories()

  },[])

  const onSubmitForm = async (data) => {
    try {
      data.status = data.status ? "STATUS_HOLD" : "STATUS_ACTIVE"
      setLoading(true)
      const response = await serverClient.post('/jobpost', data)
      if (response.status === 200)
        navigate(`/posts/${response.data.id}`)
    } catch (error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack spacing={2}>
        <BasicCard sx={{ px: 2 }}>
          <Typography variant='h5' my={1}>Create a Job Listing</Typography>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={1.5} sx={{ mt: 0 }}>
              <Grid item xs={12} md={12}>
                { error && (
                    <Alert severity="error">
                      <AlertTitle>Error!</AlertTitle>
                      <strong>{error.message}</strong>
                    </Alert>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                    name="title"
                    defaultValue={''}
                    rules={{ required: true }}
                    control={control}
                    render={ ({field}) => (
                      <TextField
                          {...field}
                          label="Title" 
                          variant="outlined"
                          placeholder = "Ex: Junior Frontend React Developer"
                          fullWidth 
                          error={errors.title && true}
                      />
                    )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                    name="description"
                    defaultValue={''}
                    rules={{ required: true }}
                    control={control}
                    render={ ({field}) =>
                      (<TextField
                        {...field}
                        error={errors.description && true}
                        multiline
                        label = 'Description'
                        placeholder = 'Enter a breif about the Job Post. Ex: What type of Job, Working Days, Location of the Job, etc.'
                        minRows={6}
                        maxRows={6}
                        fullWidth
                      />)}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="category"
                  rules={{ required: true }}
                  control={control}
                  render={({field: { onChange }}) => (
                    <Autocomplete
                        onChange={(e, value) => onChange(value)} 
                        options={categories}
                        renderInput={params => <TextField {...params} label='Select Category' placeholder='Ex: Database Engineering' error={ errors.category && true }/>}
                        isOptionEqualToValue={(option, value) => ( option.id === value.id )}
                        getOptionLabel={option => option.name || ""}
                        renderOption={(props, option) => (
                            <Box component={'li'} {...props} value={option.id}>
                                {option.name}
                            </Box>
                        )}
                    />
                  )}
                >
                </Controller>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="type"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={''}
                  render={({field}) => (
                    <FormControl fullWidth>
                      <InputLabel id="JobPost-Creation-Type-select-label" error={errors.type && true}>Select Type</InputLabel>
                      <Select
                        {...field}
                        labelId="JobPost-Creation-Type-select-label"
                        label="Select Type"
                        error={errors.type && true}
                        >  
                          <MenuItem value = {"TYPE_PERMANENT"}>Full Time</MenuItem> 
                          <MenuItem value = {"TYPE_PART_TIME"}>Part Time</MenuItem> 
                          <MenuItem value = {"TYPE_FREELANCE"}>Freelance</MenuItem> 
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="skillList"
                  rules={{ required: true }}
                  control={control}
                  render={({field: { onChange }}) => (
                  <Autocomplete
                      multiple
                      onChange={(e, value) => onChange(value)} 
                      options={skills}
                      renderInput={params => <TextField {...params} label='Select Skills' error={ errors.skillList && true }/>}
                      isOptionEqualToValue={(option, value) => ( option.id === value.id )}
                      getOptionLabel={option => option.name || ""}
                      renderOption={(props, option) => (
                          <Box component={'li'} {...props} value={option.id}>
                              {option.name}
                          </Box>
                      )}
                  /> )}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="dueDate"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={''}
                  render={({field}) => (
                    <TextField
                      {...field}
                      type='date'
                      label="Due Date"
                      InputLabelProps={{ shrink: true }}
                      error={errors.dueDate && true}
                      fullWidth
                    /> )}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Controller
                  name="urgent"
                  control={control}
                  defaultValue={false}
                  render={({field: { onChange, value }}) => (
                    <FormControlLabel sx={{ height: '100%', ml: 1 }} label='Urgent' control={
                      <Checkbox color='primary' checked={value} onChange={e => onChange(e.target.checked)} />
                    }/>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={false}
                  render={({field: { onChange, value }}) => (
                    <FormControlLabel sx={{ height: '100%', ml: 1 }} label='On Hold' control={
                      <Checkbox color='primary' checked={value} onChange={e => onChange(e.target.checked)} />
                    }/>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel sx={{ height: '100%', ml: 1 }} label='Screening Test' control={
                  <Checkbox color='primary' checked={addScreeningTest} onChange={e => setAddScreeningTest(e.target.checked)} />
                }/>
              </Grid>
              {
                !addScreeningTest && (
                  <Grid item xs={12}>
                    <Stack direction={'row'} justifyContent={'right'} spacing={2} md={6}>
                      <Button variant='outlined' onClick={() => { navigate('/home') }}>Cancel</Button >         
                      <Button variant='contained' type='submit' disabled={loading}>Submit</Button>
                    </Stack>
                  </Grid>
                )
              }
            </Grid>
          </form>
        </BasicCard>
        {
          addScreeningTest && (
            <AddQuestionary addPicture={false} handleSubmit={data => { console.log(data) }}/>
          )
        }
    </Stack>
  );
};
