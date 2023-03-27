import React, { createContext, useEffect, useMemo } from 'react'
import { BasicCard } from '../cards/BasicCard'
import { Stack } from '@mui/system'
import { Box, Button, Modal, Tab, Tabs } from '@mui/material'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectAuthUserToken } from 'features/authSlice';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProfileWithFullNameSubtitle } from './ProfileWithFullNameSubtitle';
import { NewChat } from './Message/NewChat';
import { UploadProfilePictureForm } from 'components/authentication/user/UploadProfilePictureForm';

export const ProfileContext = createContext()

export const Profile = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const authUser = useSelector(selectAuthUser)
    const [ profileData, setProfileData ] = useState(null)
    const navigate = useNavigate()
    const [ newChatOpen, setNewChatOpen ] = useState(false);
    const [ updateProfilePictureModal, setUpdateProfilePictureModal ] = useState(false)

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

    const { profileRouteButtons, role, editable } = useMemo(() => getButtons(profileData, authUser), [profileData, authUser])
    const showRecommendBtn = profileData?.role === "ROLE_JOB_SEEKER" && authUser.role === "ROLE_JOB_CREATOR"

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
                <Stack direction={{ ...( !editable || showRecommendBtn ? { xs: 'column', md: 'row' } : { xs: 'row' } ) }} justifyContent={'space-between'} alignItems={ !(!editable && showRecommendBtn) ? "center" : undefined } spacing={2}>
                    <ProfileWithFullNameSubtitle
                        name={profileData?.displayName}
                        subtitle={role}
                        src={profileData?.displayPicture}
                        onHover={ editable && (
                            <Box m={1}>
                                <Button onClick={() => {setUpdateProfilePictureModal(true)}}>Change</Button>
                            </Box>
                        )}
                    />
                        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                            <Stack spacing={2} direction="row">
                                { (!editable) && <Button onClick={() => setNewChatOpen(true)}>Message</Button> }
                                { (showRecommendBtn) && <Button>Recommend</Button> }
                            </Stack>
                        </Stack>
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
        <Modal
            open={newChatOpen}
            onClose={() => setNewChatOpen(!newChatOpen)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <NewChat initialParticipants={[profileData]} onClose={() => setNewChatOpen(!newChatOpen)}/>
        </Modal>
        <Modal
            open={updateProfilePictureModal}
            onClose={() => setUpdateProfilePictureModal(false)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={{ width: { xs: '95%', md: '75%', lg: '60%' } }}>
            <UploadProfilePictureForm onUpdate={(data) => {
                // setExperiences(data)
                setUpdateProfilePictureModal(false)
            }}
            onCancel={() => setUpdateProfilePictureModal(false)}
            />
            </Box>
        </Modal>
        </Stack>
  )
} 

const getButtons = (profileData, authUser) => {

    let profileRouteButtons = [
        { text: "About", location: './' },
    ];
    let role = null
    let editable = profileData?.id === authUser.id

    if (profileData?.role === "ROLE_JOB_SEEKER") {
        profileRouteButtons.push( 
            { text: "Qualifications", location: './qualifications' },
            { text: "Experiences", location: './experiences' },
            { text: "Recommendations", location: './recommendations' },
            { text: "Skills", location: './skills' }
        )
        role = "Job Seeker"
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

    return { profileRouteButtons, role, editable }
}
