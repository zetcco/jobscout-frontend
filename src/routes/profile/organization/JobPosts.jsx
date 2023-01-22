import { Button } from '@mui/material'
import React from 'react'
import { Profile } from '../../../components/profile/Profile'
import { ProfileWithFullNameSubtitle } from '../../../components/profile/ProfileWithFullNameSubtitle'
import SingleJobPost from '../../../components/job_postings/SingleJobPost';

export const JobPost = () => {
  return (
        <Profile
            profileIcon={<ProfileWithFullNameSubtitle name = {'Nipun Madumal'} subtitle={'Creative Software'}/>}

            buttonSet2 ={[
                <Button variant = {'outlined'}>Job Posts</Button> , 
                <Button variant = {'outlined'}>Posts</Button>,
                <Button variant = {'outlined'}>Gallery</Button> , 
            
            ]}

            contend = {[
                <SingleJobPost/>,
                <SingleJobPost/>,
                <SingleJobPost/>,
            ]}
        />
  )
}
