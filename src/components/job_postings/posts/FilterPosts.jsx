import React, { useState , useEffect } from "react";
import {Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { selectAuthUserToken } from "features/authSlice";
import { useSelector } from "react-redux";

const FilterPosts = () => { 

    const [categories , setCategories] = useState([]);
    const [category , setCategory] = useState('');
    const token = useSelector(selectAuthUserToken)
    useEffect(() => {
        axios.get('/category/' , {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(cat =>{
            console.log(cat)
            setCategories(cat.data)
        })
        .catch(err =>{
            console.log(err)
        })
    } , [])

    return ( 

                        <Stack direction={'column'} spacing={4}>
                                <FormControl>
                                    <InputLabel id="Small-panel-filter-by-fields-label">Filter by fields</InputLabel>
                                    <Select
                                        labelId="Small-panel-filter-by-fields-label"
                                        id="Small-panel-filter-by-fields"
                                        value = {category}
                                        onChange = {(e) => setCategory(e.target.value)}
                                        label="Fileds"      
                                    >
                                        {
                                            categories.map((category) =>
                                            <MenuItem value = {category.id}>{category.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="Small-panel-filter-by-skills-label">Filter by skills</InputLabel>
                                    <Select
                                        labelId="Org-registration-city-select-label"
                                        id="Org-registration-city-select"
                                        label="City"
    
                                    >
                            
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="Small-panel-filter-by-location-label">Filter by location</InputLabel>
                                    <Select
                                        labelId="Org-registration-city-select-label"
                                        id="Org-registration-city-select"
                                        label="City"
                                 >
                                       
                                    </Select>
                            </FormControl>
                    </Stack>
     );
}           
 
export default FilterPosts;