import { Button } from '@mui/material'
import React from 'react'
import { Profile } from '../../components/profile/Profile'
import { ProfileWithFullNameSubtitle } from '../../components/profile/ProfileWithFullNameSubtitle'
import { Comments } from '../../components/SocialMedia/Comments'

export const JobSeekerRecommendation = () => {
  return (
        <Profile
            profileIcon={<ProfileWithFullNameSubtitle name = {'Nipun Madumal'} subtitle={'Creative Software'}/>}
            buttonSet1 ={[
                <Button variant = {'outlined'}>Message</Button> , 
                <Button variant = {'outlined'}>Recommendations</Button>
            ]}

            buttonSet2 ={[
                <Button variant = {'outlined'}>Recommendations</Button> , 
                <Button variant = {'outlined'}>Posts</Button>,
                <Button variant = {'outlined'}>Qualification</Button> , 
                <Button variant = {'outlined'}>Portfolio</Button>
            ]}

            comments = {<Comments/>}
        />
  )
}
