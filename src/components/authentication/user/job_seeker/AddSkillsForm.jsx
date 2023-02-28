import { Button, Chip, MenuItem, Select } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard';
import { RouterLink } from '../../../RouterLink';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthUserToken } from 'features/authSlice';

export const AddSkillsForm = () => {
  const [field, setField] = useState();
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [selected, setSeletected] = useState([]);
  const authToken = useSelector(selectAuthUserToken);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const response = await axios.get(`/skills/`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    setSkills(response.data);
  };

  return (
    <CenteredHeaderCard
      title={'Add your Skills'}
      footer={
        <RouterLink to={'/signup/user/seeker/profile/qualification'}>
          <Button variant='contained' sx={{ width: '100%' }}>
            Continue
          </Button>
        </RouterLink>
      }
    >
      <Stack spacing={2} sx={{ width: '100%' }} >
        <FormControl fullWidth>
          <InputLabel id='Org-registration-country-select-label'>
            Select your Field
          </InputLabel>
          <Select
            labelId='Org-registration-country-select-label'
            value={field}
            onChange={(e) => {
              setField(e.target.value);
            }}
            label='Select your Field'
          >
            <MenuItem value='Accountancy & Finance'>
              Accountancy & Finance
            </MenuItem>
            <MenuItem value='Hotel / Hospitality'>Hotel / Hospitality</MenuItem>
            <MenuItem value='Production & Operations'>
              Production & Operations
            </MenuItem>
            <MenuItem value='IT & Software'>IT & Software</MenuItem>
            <MenuItem value='Retail & Fashion'>Retail & Fashion</MenuItem>
            <MenuItem value='Engineering & Manufacturing'>
              Engineering & Manufacturing
            </MenuItem>
            <MenuItem value='Digital Marketing'>Digital Marketing</MenuItem>
          </Select>
        </FormControl>
        <Stack direction={'row'} spacing={2}>
          <Box sx={{ flexGrow: 10 }}>
            <FormControl fullWidth>
              <InputLabel id='Org-registration-country-select-label'>
                Select your Skills
              </InputLabel>
              <Select
                labelId='Org-registration-country-select-label'
                value={skill}
                onChange={(e) => {
                  setSkill(e.target.value);
                }}
                label='Select your Field'
              >
                {skills.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Button
              variant='contained'
              fullWidth
              sx={{ height: '100%' }}
              onClick={() => {
                setSeletected([...selected, skill]);
                setSkills(skills.filter((item) => item != skill))
              }}
            >
              Add
            </Button>
          </Box>
        </Stack>
        <Stack direction='row' spacing={1}>
          {selected.map((skill) => (
            <Chip
              label={skill.description}
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
      </Stack>
    </CenteredHeaderCard>
  );
};
