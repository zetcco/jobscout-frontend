import { Button, Chip, MenuItem, Select } from "@mui/material"
import { Box, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { CenteredHeaderCard } from "../../../cards/CenteredHeaderCard"
import { RouterLink } from "../../../RouterLink"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectAuthError, selectAuthUserToken } from "features/authSlice"
import axios from "axios"

export const AddSkillsForm =() =>{

    const [ field, setField ] = useState();
    const [ skill, setSkill ] = useState();
    const [ selected, setSeletected ] = useState([]);
    let skills = []


    const [categories , setCategories] = useState([]);
    const [category , setCategory] = useState('');
    const token = useSelector(selectAuthUserToken);

    useEffect(()=>{
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/category/' , {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchCategories()

    },[token])
    
    if (field === "IT & Software")
        skills = ["React", "Spring", ".NET", "Angular", "Flutter"]

    return(
        <CenteredHeaderCard 
            title={"Add your Skills"}
            footer={
                <RouterLink to={"/signup/user/seeker/profile/qualification"}>
                    <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
                </RouterLink>
            }
        >
             <Stack spacing={2} sx={{ width: '100%' }}>
                <FormControl fullWidth>
                    <InputLabel id="Org-registration-country-select-label">Select your Field</InputLabel>
                    <Select labelId="Org-registration-country-select-label" value={category} onChange={(e) => { setCategory(e.target.value) }} label="Select your Field" >
                        {
                            categories.map((category) => 
                            <MenuItem value = {category.id}>{category.name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Stack direction={"row"} spacing={2}>
                    <Box sx={{ flexGrow: 10 }}>
                        <FormControl fullWidth>
                            <InputLabel id="Org-registration-country-select-label">Select your Skills</InputLabel>
                            <Select labelId="Org-registration-country-select-label" value={skill} onChange={(e) => { setSkill(e.target.value) }} label="Select your Field" >
                                {
                                    skills.map((item) => (<MenuItem value={item}>{item}</MenuItem>))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ flexGrow: 2 }}>
                        <Button variant="contained" fullWidth sx={{ height: '100%' }} onClick={() => { setSeletected([...selected, skill]) }}>Add</Button>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1}>
                    {
                        selected.map((skill) => <Chip label={skill} color="primary" variant="outlined"/>)
                    }
                </Stack>
            </Stack>
           

        </CenteredHeaderCard>
    )
}