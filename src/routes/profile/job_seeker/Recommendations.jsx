import { Button } from '@mui/material'
import React from 'react'
import { Profile } from '../../../components/profile/Profile'
import { ProfileWithFullNameSubtitle } from '../../../components/profile/ProfileWithFullNameSubtitle'
import AddIcon from '@mui/icons-material/Add';
import { Comments } from '../../../components/SocialMedia/Comments';

export const Recommendations = () => {
  return (
        <Profile
            profileIcon={<ProfileWithFullNameSubtitle name = {'Nipun Madumal'} subtitle={'Creative Software'}/>}
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
                <Comments name = {'Nipun Madumal'}/> , 
                <Comments name = {'Rajitha Thilanka'}/> ,
                <Comments name = {'Praveen Chamod'}/> 
            ]}
        />
  )
}
