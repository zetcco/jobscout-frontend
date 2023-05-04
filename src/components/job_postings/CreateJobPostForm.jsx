import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle} from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';
import { selectAuthUserToken, serverClient } from 'features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DatePicker} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const CreateJobPostForm = () => {

const navigate = useNavigate()

const [categories , setCategories] = useState([]);
const [error , setError] = useState(null);
const [data , setData] = useState({
  dueDate:"",
  title: "",
  description: "",
  type:"",
  urgent:"",
  status:"",
  category:{
    id:"",
    title:"",
    description:""
  }
})

const [loading, setLoading] = useState(false)

const handle= (e) => {
  if (e.target.name === "category")
    setData((prev) => ({ ...prev , [e.target.name] : { id: e.target.value}}))
  else
    setData((prev) => ({...prev , [e.target.name] : e.target.value}))
}

// function for handle the submiting
const handleSubmit = async () => {
  try{
    setLoading(true)
    const resdata = await axios.post('/jobpost', data, { headers: { Authorization: `Bearer ${token}`}}) 
    if (resdata.status === 200)
      navigate(`/posts/${resdata.data.id}`)
    console.log(resdata);
  }catch(error){
    setError(error.response.data);
    console.log(error);
  }
  setLoading(false)
}

// function to handle the canceling
const handleCancel = async () => {
  try{
    setLoading(true)
    navigate(`/home`)
  }catch(error){
    setError(error.response.data)
    console.log(error);
  }
  setLoading(false)
}

const token = useSelector(selectAuthUserToken);

useEffect(()=>{
  const fetchCategories = async () => {
      try {
          const response = await serverClient.get('/category/')
          setCategories(response.data)
        
      } catch (error) {
          setError(error.response.data);
          console.error(error);
      }
  }
  fetchCategories()

  },[])


  return (
    <>
      <Stack>
        <CenteredHeaderCard
          title={'Create Job Post'}
          footer={
            <Stack direction={'row'} spacing={2} md={6}>
              <Button variant='outlined' fullWidth onClick={handleCancel}>Cancel</Button >         
              <Button variant='contained' fullWidth onClick={handleSubmit} disabled={loading}>Submit</Button>
            </Stack>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              { error && (
                  <Alert severity="error">
                    <AlertTitle>Error!</AlertTitle>
                    <strong>{error.message}</strong>
                  </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name = "title"
                label = 'Title'
                value = {data.title}
                placeholder = 'Enter the Title'
                variant = 'outlined'
                onChange = {handle}
                fullWidth
                rules = {{required : true}} 
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name = "description"
                label = 'Description'
                value = {data.description}
                onChange = {handle}
                placeholder = 'Enter the Description'
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
                rules = {{required : true}} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Category-select-label">Select Category</InputLabel>
                  <Select
                      labelId = "JobPost-Creation-Category-select-label"
                      name = "category"
                      value = {data.category.id}
                      onChange = {handle}
                      label = "Category"
                      rules = {{required : true}}    
                      >
                       {
                        categories.map((category) =>
                        <MenuItem value = { category.id }>{ category.name }</MenuItem>)
                       }     
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Skill-select-label">Select Skills</InputLabel>
                  <Select
                      labelId = "JobPost-Creation-Skill-select-label"
                      name = "skills"
                      value = {data.category.id}
                      onChange = {handle}
                      label = "Skills"
                      rules = {{required : true}}    
                      >
                       {
                        categories.map((category) =>
                        <MenuItem value = { category.id }>{ category.name }</MenuItem>)
                       }     
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Type-select-label">Select Type</InputLabel>
                  <Select
                      labelId="JobPost-Creation-Type-select-label"
                      name="type"
                      value = {data.type}
                      onChange = {handle}
                      label="Type"
                      rules = {{required : true}}    
                      >  
                        <MenuItem value = {"TYPE_PERMANENT"}>Full Time</MenuItem> 
                        <MenuItem value = {"TYPE_PART_TIME"}>Part Time</MenuItem> 
                        <MenuItem value = {"TYPE_FREELANCE"}>Freelance</MenuItem> 
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Status-select-label">Select Status</InputLabel>
                  <Select
                      labelId = "JobPost-Creation-Status-select-label"
                      name = "status"
                      value = {data.status}  
                      onChange = {handle}
                      label = "Status"
                      rules = {{required : true}}    
                      >
                        <MenuItem value = {'STATUS_ACTIVE'}>Active</MenuItem> 
                        <MenuItem value = {'STATUS_HOLD'}>Hold</MenuItem> 
                        <MenuItem value = {'STATUS_OVER'}>Over</MenuItem>    
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack fullWidth>
                  <DatePicker 
                    name = "dueDate"
                    label="Due Date"
                    disablePast
                    onChange={handle}
                    value={data.dueDate}
                    rules = {{required : true}} 
                    />
                    </Stack>
                </LocalizationProvider>     
            </Grid>
                       
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Urgent-select-label">Select Urgent</InputLabel>
                  <Select
                      labelId = "JobPost-Creation-Urgent-select-label"
                      name = "urgent"
                      value = {data.urgent}
                      onChange = {handle}
                      label = "Urgent" 
                      rules = {{required : true}}  
                      >
                        <MenuItem value = {true}>Urgent</MenuItem> 
                        <MenuItem value = {false}>Not urgent</MenuItem>    
                    </Select>
                </FormControl>
            </Grid>
          </Grid>
        </CenteredHeaderCard>
      </Stack>
    </>
  );
};
