import React, { useState , useEffect } from "react";
import {Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { serverClient } from "features/authSlice";

export const FilterPosts = ({ filterValues, setFilterValues }) => { 

    const [categories , setCategories] = useState([]);
    const [skills , setSkills] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const resCategory = await serverClient.get('/category/')
                const resSkill = await serverClient.get('/skills/')
                setCategories(resCategory.data)
                setSkills(resSkill.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    
        },[])

    return ( 

                <Stack direction={'column'} spacing={4}>
                        <FormControl>
                            <InputLabel id="Small-panel-filter-by-categories-label">Filter by Category</InputLabel>
                            <Select
                                labelId="Small-panel-filter-by-categories-label" 
                                id="Small-panel-filter-by-categories"
                                value = {filterValues.category}
                                onChange = {(e) => setFilterValues({ ...filterValues, category: e.target.value })}
                                label="category"      
                            >
                                {
                                    categories.map((category, index) =>
                                    <MenuItem value = {category.id} key={index}>{category.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="Small-panel-filter-by-skills-label">Filter by skills</InputLabel>
                            <Select
                                labelId="Small-panel-filter-by-skills-label"
                                id="Small-panel-filter-by-skills"
                                label="skill"
                                value={filterValues.skill}
                                onChange = {(e) => setFilterValues({ ...filterValues, skill: e.target.value })}
                            >
                                {
                                    skills.map((skill , index) =>
                                    <MenuItem value={skill.id} key={index}>{skill.name}</MenuItem>)
                                }
                    
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="Small-panel-filter-by-status-label">Filter by Status</InputLabel>
                            <Select
                                labelId="Small-panel-filter-by-status-label"
                                id="Small-panel-filter-by-status"
                                label="status"
                                value={filterValues.status}
                                onChange={(e) => setFilterValues({ ...filterValues , status: e.target.value})}
                            >
                                <MenuItem value = {'STATUS_ACTIVE'}>Activated</MenuItem>
                                <MenuItem value = {'STATUS_OVER'}>Deactivated</MenuItem>
                                <MenuItem value = {'STATUS_HOLD'}>Holded</MenuItem>   
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="Small-panel-filter-by-type-label">Filter by Type</InputLabel>
                            <Select
                                labelId="Small-panel-filter-by-type-label"
                                id="Small-panel-filter-by-type"
                                label="type"
                                value={filterValues.type}
                                onChange={(e) => setFilterValues({ ...filterValues , type: e.target.value})}
                            >
                                <MenuItem value = {'TYPE_PERMANENT'}>Full Time</MenuItem>
                                <MenuItem value = {'TYPE_PART_TIME'}>Part Time</MenuItem>
                                <MenuItem value = {'TYPE_FREELANCE'}>Freelance</MenuItem> 
                            </Select>
                        </FormControl>
                </Stack>
            )
        };
          
 
//export default FilterPosts;