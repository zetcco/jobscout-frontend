import { Button } from '@mui/material'
import React from 'react'
import { Profile } from '../../../components/profile/Profile'
import { ProfileWithFullNameSubtitle } from '../../../components/profile/ProfileWithFullNameSubtitle'
import AddIcon from '@mui/icons-material/Add';
import { Comments } from '../../../components/SocialMedia/Comments';

export const UserProfile = () => {
  return (
        <Profile
            profile={<ProfileWithFullNameSubtitle name = {'Nipun Madumal'} subtitle={'Job Seeker'}/>}
            profileActionButtons ={[
                <Button variant = {'outlined'} startIcon = {<AddIcon/>}>Message</Button> , 
                <Button variant = {'outlined'} startIcon = {<AddIcon/>}>Recommend</Button>
            ]}

            profileRouteButtons ={[
                <Button variant = {'outlined'}>Recommendations</Button> , 
                <Button variant = {'outlined'}>Posts</Button>,
                <Button variant = {'outlined'}>Qualification</Button> , 
                <Button variant = {'outlined'}>Portfolio</Button>
            ]}

            content = {[
                <Comments name = {'Nipun Madumal'}/> , 
                <Comments name = {'Rajitha Thilanka'}/> ,
                <Comments name = {'Praveen Chamod'}/> 
            ]}
        />
  )
}
