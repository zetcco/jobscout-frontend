import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';
import { selectAuthUserToken } from 'features/authSlice';
import axios from 'axios';

export const CreateJobPostForm = () => {

const [categories , setCategories] = useState([]);
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

const handle= (e) => {
  if (e.target.name === "category")
    setData((prev) => ({ ...prev , [e.target.name] : { id: e.target.value}}))
  else
    setData((prev) => ({...prev , [e.target.name] : e.target.value}))
}

const handleSubmit = async () => {
  const resdata = await axios.post('/jobpost', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(resdata)
}

const token = useSelector(selectAuthUserToken);

useEffect(()=>{
  const fetchCategories = async () => {
      try {
          const response = await axios.get('/category/' , {
              headers:{Authorization: `Bearer ${token}`}
          })
          setCategories(response.data)
        
      } catch (error) {
          console.error(error)
      }
  }
  fetchCategories()

  },[token])

  return (
    <>
      <Stack>
        <CenteredHeaderCard
          title={'Create Job Post'}
          footer={
            <Stack direction={'row'} spacing={2} md={6}>
              <Button variant='outlined' fullWidth>Cancel</Button>
              <Button variant='contained' fullWidth onClick={handleSubmit}>Submit</Button>
            </Stack>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name = "title"
                label = 'Title'
                value = {data.title}
                placeholder = 'Enter the Title'
                variant = 'outlined'
                onChange = {handle}
                fullWidth
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
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Category-select-label">Select Category</InputLabel>
                  <Select
                      labelId = "JobPost-Creation-Category-select-label"
                      name = "category"
                      value = {data.category.id}
                      onChange = {handle}
                      label = "Category"   
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
                      label = "City"   
                      >
                        <MenuItem value = {'STATUS_ACTIVE'}>Active</MenuItem> 
                        <MenuItem value = {'STATUS_HOLD'}>Hold</MenuItem> 
                        <MenuItem value = {'STATUS_OVER'}>Over</MenuItem>    
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label = 'Due Date'
                type = 'date'
                name = "dueDate"
                value = {data.dueDate}
                onChange = {handle}
                placeholder = 'Enter due date'
                InputLabelProps = {{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <InputLabel id="JobPost-Creation-Urgent-select-label">Select Urgent</InputLabel>
                  <Select
                      labelId = "JobPost-Creation-Urgent-select-label"
                      name = "urgent"
                      value = {data.urgent}
                      onChange = {handle}
                      label = "City"   
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
