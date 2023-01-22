import { Button } from '@mui/material'
import React from 'react'
import { Profile } from '../../../components/profile/Profile'
import { ProfileWithFullNameSubtitle } from '../../../components/profile/ProfileWithFullNameSubtitle'
import SingleJobPost from '../../../components/job_postings/SingleJobPost';

export const OrgJobPosts = () => {
  return (
        <Profile
            profileIcon={<ProfileWithFullNameSubtitle name = {'Creative Software'} subtitle={'Organization'}/>}

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
