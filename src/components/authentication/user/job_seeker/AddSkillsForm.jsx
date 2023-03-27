import { Alert, AlertTitle, Button, Chip, CircularProgress, Divider, MenuItem, Select } from "@mui/material"
import { Box, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { CenteredHeaderCard } from "../../../cards/CenteredHeaderCard"
import { RouterLink } from "../../../RouterLink"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { selectAuthUserId, selectAuthUserToken } from 'features/authSlice';
import { Add } from "@mui/icons-material"
import { OptionCard } from "components/profile/education/OptionCard"
import { useNavigate } from "react-router-dom"

export const AddSkillsForm = ({ onUpdate, onCancel }) => {
    const [category, setCategory] = useState('');
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);
    const [selected, setSeletected] = useState([]);
    const [categorySkillLists, setCategorySkillLists] = useState([]);
    const [ loading, setLoading ] = useState(false)
    const [ existingLoading, setExistingLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [categories , setCategories] = useState([]);

    const authToken = useSelector(selectAuthUserToken);
    const authUserId = useSelector(selectAuthUserId)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/category/' , { headers:{ Authorization: `Bearer ${authToken}` } })
                setCategories(response.data)
                setExistingLoading(true)
                const existingSkills = await (await axios.get(`/job-seeker/${authUserId}/skillset`, { headers: { Authorization: `Bearer ${authToken}` } })).data
                setCategorySkillLists(existingSkills)
                existingSkills.forEach(skillSet => {
                  setCategories((prevState) => prevState.filter((item) => item.id !== skillSet.category.id))
                });
                setExistingLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategories()
    },[authToken])

    const fetchSkills = async (e) => {
      setCategory(e.target.value);
      const response = await axios.get(`/category/${e.target.value.id}/skills` , { headers:{ Authorization: `Bearer ${authToken}` } })
      setSkills(response.data);
    }

    const addCategorySkillList = () => {
      const categorySkillList = { category, skills: selected }
      setCategory('')
      setCategories(categories.filter((item) => item !== category))
      setSkill('')
      setSeletected([])
      setCategorySkillLists((prevState) => [ ...prevState, categorySkillList ])
    }

    const updateProfile = async () => {
      try {
        setLoading(true)
        const data = await axios.put('/job-seeker/update/skills', categorySkillLists, { headers: { Authorization: `Bearer ${authToken}` } })
        if (data.status === 200)
          if (onUpdate) onUpdate(data.data) 
          else navigate('/signup/user/seeker/profile/qualification')
      } catch (error) {
        setError(error.response.data)
      }
      setLoading(false)
    }

    return (
    <CenteredHeaderCard
      title={'Add your Skills'}
      footer={
            <Stack direction="row" spacing={2}>
              {
                onUpdate ? (
                  <>
                    <Box sx={{ width: '100%' }}>
                      <Button onClick={onCancel} variant='outlined' sx={{ width: '100%' }}>Cancel</Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ width: '100%' }}>
                      <RouterLink to="/signup/user/seeker/profile/intro">
                        <Button variant='outlined' sx={{ width: '100%' }}>Go Back</Button>
                      </RouterLink>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <RouterLink to="/signup/user/seeker/profile/qualification">
                        <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                      </RouterLink>
                    </Box>
                  </>
                )
              }
                <Box sx={{ width: '100%' }}>
                  <Button variant='contained' sx={{ width: '100%' }} onClick={updateProfile} disabled={categorySkillLists.length === 0 || loading}>Continue</Button>
                </Box>
            </Stack>
      }
    >
      <Stack spacing={2} sx={{ width: '100%' }} >
      {
          error && 
          (
              <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>{error.message}</strong>
              </Alert>
          )
      }
        <FormControl fullWidth>
          <InputLabel id='categories-select'>
            Select your Field
          </InputLabel>
          <Select
            labelId='categories-select'
            value={category}
            onChange={fetchSkills}
            label='Select your Field'
          >
            {
                categories.map((category) => 
                <MenuItem key={category.id} value={category}>{category.name}</MenuItem>)
            }
          </Select>
        </FormControl>
        <Stack direction={'row'} spacing={2}>
          <Box sx={{ flexGrow: 10 }}>
            <FormControl fullWidth>
              <InputLabel id='skill-select'>
                Select your Skills
              </InputLabel>
              <Select
                labelId='skill-select'
                value={''}
                disabled={!!!category}
                onChange={(e) => {
                  setSeletected([...selected, e.target.value]);
                  setSkill('')
                  setSkills(skills.filter((item) => item !== e.target.value))
                }}
                label='Select your Field'
              >
                {skills.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant='contained'
              fullWidth
              sx={{ height: '100%' }}
              onClick={addCategorySkillList}
              disabled={selected.length === 0}
            >
              Add Skill List
            </Button>
          </Box>
        </Stack>
        <Stack direction='row' spacing={1}>
          {selected.map((skill) => (
            <Chip
              label={skill.name}
              color='primary'
              variant='outlined'
              onDelete={() => {
                setSeletected(selected.filter((skillItem) => skillItem.id !== skill.id))
                setSkills([...skills, skill])
              }}
              key={skill.id}
            />
          ))}
        </Stack>
        { categorySkillLists.length !== 0 && <Divider/> }
        <Stack spacing={1}>
          { existingLoading ? 
          (
            <Stack width={"100%"} alignItems='center'>
              <CircularProgress/>
            </Stack>
          ) : (
              categorySkillLists.map( (skillList, index) => (
                <OptionCard title={skillList.category.name} key={index} onClose={() => { 
                  setCategorySkillLists((prevState) => prevState.filter((obj) => obj.category.id !== skillList.category.id))
                  setCategories((prevState) => [...prevState, skillList.category])
                }}>
                  <Stack direction='row' spacing={1} mt={1}>
                    {skillList.skills.map((skill) => (
                      <Chip
                        label={skill.name}
                        color='primary'
                        variant='outlined'
                        key={skill.id}
                      />
                    ))}
                  </Stack>
                </OptionCard>
              ))
        )}
        </Stack>
      </Stack>
    </CenteredHeaderCard>
  );
};
