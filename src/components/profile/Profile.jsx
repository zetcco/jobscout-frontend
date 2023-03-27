import React, { createContext, useEffect, useMemo } from 'react'
import { BasicCard } from '../cards/BasicCard'
import { Stack } from '@mui/system'
import { Button, Tab, Tabs } from '@mui/material'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectAuthUserToken } from 'features/authSlice';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProfileWithFullNameSubtitle } from './ProfileWithFullNameSubtitle';

export const ProfileContext = createContext()

export const Profile = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const authUser = useSelector(selectAuthUser)
    const [ profileData, setProfileData ] = useState(null)
    const navigate = useNavigate()

    const location = useLocation()
    let rel_location = location.pathname.split("/")
    rel_location = rel_location.length === 3 ? "" : rel_location.at(-1)
    const [ selectedTab, setSelectedTab ] = useState('./' + rel_location)

    useEffect(() => {
        const getProfileData = async () => {
            const res = await axios.get(`/user/${userId}`, { headers: {
                Authorization: `Bearer ${authToken}`
             } })
            setProfileData(res.data)
        }
        getProfileData()
    }, [authToken, userId])

    const { profileRouteButtons, profileActionButtons, role, editable } = useMemo(() => getButtons(profileData, authUser), [profileData, authUser])

    return (
        <Stack spacing={2}>
        <BasicCard
            inner_sx={{
                p: (theme) => { 
                    let spacing = [theme.spacing(2), theme.spacing(4)]
                    return { 
                        xs: `${spacing[0]} ${spacing[0]} 0 ${spacing[0]}`,
                        sm: `${spacing[1]} ${spacing[1]} 0 ${spacing[1]}`
                    } 
                }
            }}
        >
            <Stack direction={'column'} spacing={4}>
                <Stack direction={{ ...( profileActionButtons.length !== 0 ? { xs: 'column', md: 'row' } : { xs: 'row' } ) }} justifyContent={'space-between'} alignItems={ !profileActionButtons ? "center" : undefined } spacing={2}>
                    <ProfileWithFullNameSubtitle name={profileData?.displayName} subtitle={role} src={profileData?.displayPicture}/>
                    {
                        profileActionButtons.length !== 0 && 
                        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                            <Stack spacing={2} direction="row">
                                {profileActionButtons.map((button, index) => (
                                    <Button onClick={button.callback} key={index}>{button.text}</Button>
                                ))} 
                            </Stack>
                        </Stack>
                    }

                </Stack>
                <Tabs value={selectedTab} variant='scrollable' allowScrollButtonsMobile onChange={(e, v) => { 
                    setSelectedTab(v)
                    navigate(v)
                }}>
                    {profileRouteButtons.map((button, index) => (
                        <Tab value={button.location} key={index} label={button.text}/>
                    ))} 
                </Tabs>
            </Stack>
        </BasicCard>
        <BasicCard>
            <ProfileContext.Provider value={{...profileData, editable }}>
                <Outlet/>
            </ProfileContext.Provider>
        </BasicCard>
        </Stack>
  )
} 

const getButtons = (profileData, authUser) => {

    let profileRouteButtons = [
        { text: "About", location: './' },
    ];
    let profileActionButtons = [];
    let role = null
    let editable = profileData?.id === authUser.id

    if (!editable)
        profileActionButtons.push(
            { text: "Message", callback: () => {} }
        )

    if (profileData?.role === "ROLE_JOB_SEEKER") {
        profileRouteButtons.push( 
            { text: "Qualifications", location: './qualifications' },
            { text: "Experiences", location: './experiences' },
            { text: "Recommendations", location: './recommendations' },
            { text: "Skills", location: './skills' }
        )
        role = "Job Seeker"
        if (authUser.role === "ROLE_JOB_CREATOR")
            profileActionButtons.push( 
                { text: "Recommend", callback: () => {} }
            )
    } else if (profileData?.role === "ROLE_JOB_CREATOR") {
        profileRouteButtons.push( 
            { text: "Posts", location: './posts' },
        )
        role = "Job Creator"
    } else if (profileData?.role === "ROLE_ORGANIZATION") {
        profileRouteButtons.push( 
            { text: "Posts", location: './posts' },
            { text: "Gallery", location: './gallery' }
        )
        role = "Organization"
    }

    return { profileRouteButtons, profileActionButtons, role, editable }
}
