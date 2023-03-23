import React, { useEffect } from 'react'
import { BasicCard } from '../cards/BasicCard'
import { Stack } from '@mui/system'
import { Box, Button, IconButton, Popover } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectAuthUserToken } from 'features/authSlice';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProfileWithFullNameSubtitle } from './ProfileWithFullNameSubtitle';
import { ChatBubbleRounded, EditRounded, StarRounded } from '@mui/icons-material';
import { RouterLink } from 'components/RouterLink';

export const Profile = ({profile , content}) => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const authUser = useSelector(selectAuthUser)
    const [ profileData, setProfileData ] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getProfileData = async () => {
            const res = await axios.get(`/user/${userId}`, { headers: {
                Authorization: `Bearer ${authToken}`
             } })
            console.log(res.data)
            setProfileData(res.data)
        }
        getProfileData()
    }, [authToken, userId])

    const [anchorEl, setAnchorEl] = useState(null);

    let profileRouteButtons = [];
    let profileActionButtons = [];
    let role = null
    if (profileData?.id === authUser.id)
        profileActionButtons.push(
            <Button variant = {'outlined'} startIcon = {<EditRounded/>}>Edit Profile</Button> , 
        )
    else
        profileActionButtons.push(
            <Button variant = {'outlined'} startIcon = {<ChatBubbleRounded/>}>Message</Button> , 
        )

    if (profileData?.role === "ROLE_JOB_SEEKER") {
        profileRouteButtons = [ 
            <Button variant = {'outlined'} onClick={() => navigate(`./recommendations`, { replace: false })}>Recommendations</Button>, 
            <Button variant = {'outlined'} onClick={() => navigate(`./qualifications`, { replace: false })}>Qualifications</Button>, 
            <Button variant = {'outlined'}>Portfolio</Button>
        ]
        role = "Job Seeker"
        if (authUser.role === "ROLE_JOB_CREATOR")
            profileActionButtons.push( 
                <Button variant = {'outlined'} startIcon = {<StarRounded/>}>Recommend</Button>
            )
    } else if (profileData?.role === "ROLE_JOB_CREATOR") {
        profileRouteButtons = [ 
            <Button variant = {'outlined'}>Posts</Button>,
        ]
        role = "Job Creator"
    } else if (profileData?.role === "ROLE_ORGANIZATION") {
        profileRouteButtons = [ 
            <Button variant = {'outlined'}>Posts</Button>, 
            <Button variant = {'outlined'}>Gallery</Button>
        ]
        role = "Organization"
    }

    return (
        <>
        <BasicCard>
            <Stack direction={'column'} spacing={4}>
                <Stack direction={{ ...( profileActionButtons.length !== 0 ? { xs: 'column', md: 'row' } : { xs: 'row' } ) }} justifyContent={'space-between'} alignItems={ !profileActionButtons ? "center" : undefined } spacing={2}>
                    <ProfileWithFullNameSubtitle name={profileData?.displayName} subtitle={role} src={profileData?.displayPicture}/>
                    {
                        profileActionButtons.length !== 0 && 
                        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                            <Stack spacing={2} direction="row">
                                {profileActionButtons} 
                            </Stack>
                            <Box display={{ xs: 'block', md: 'none' }}>
                                <IconButton variant="contained" size="large" onClick={(e) => {setAnchorEl(e.target)}}>
                                    <MenuIcon/>
                                </IconButton>
                            </Box>
                        </Stack>
                    }

                    {
                        profileActionButtons.length === 0 && (
                            <Box display={{ xs: 'block', md: 'none' }}>
                                <IconButton variant="contained" size="large" onClick={(e) => {setAnchorEl(e.target)}}>
                                    <MenuIcon/>
                                </IconButton>
                            </Box>
                        )
                    }

                    {/* This is the Popover component of the filters on smaller screens  */}
                    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => {setAnchorEl(null)}} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                        <BasicCard>
                            <Stack direction={"column"} spacing={2}>                           
                                {profileRouteButtons ? profileRouteButtons : []} 
                            </Stack>
                        </BasicCard>
                    </Popover>

                </Stack>
                <Box display={{ xs: "none", md: "block" }}><Stack direction = {'row'} spacing={1}>
                    {profileRouteButtons ? profileRouteButtons : []} 
                </Stack>
                </Box>
            </Stack>
        </BasicCard>
        <BasicCard>
            <Stack direction = {'column'} spacing = {4}>
                <Outlet/>
            </Stack>
        </BasicCard>
        </>
  )
} 
