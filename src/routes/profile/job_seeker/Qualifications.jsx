import { Button } from '@mui/material'
import React from 'react'
import { Profile } from '../../../components/profile/Profile'
import { ProfileWithFullNameSubtitle } from '../../../components/profile/ProfileWithFullNameSubtitle'
import AddIcon from '@mui/icons-material/Add';
import { EducationalCard } from '../../../components/profile/education/EducationalCard';

export const Qualification = () => {
  return (
        <Profile
            profileIcon={<ProfileWithFullNameSubtitle name = {'Nipun Madumal'} subtitle={'Job Seeker'}/>}
            buttonSet1 ={[
                <Button variant = {'outlined'} startIcon = {<AddIcon/>}>Message</Button> , 
                <Button variant = {'outlined'} startIcon = {<AddIcon/>}>Add Recommendations</Button>
            ]}

            buttonSet2 ={[
                <Button variant = {'outlined'}>Recommendations</Button> , 
                <Button variant = {'outlined'}>Posts</Button>,
                <Button variant = {'outlined'}>Qualification</Button> , 
                <Button variant = {'outlined'}>Portfolio</Button>
            ]}

            contend = {[
                <EducationalCard/>,
                <EducationalCard/>,
                <EducationalCard/>,
            ]}
        />
  )
}