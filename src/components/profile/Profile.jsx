import React, { createContext, useEffect, useMemo } from 'react'
import { BasicCard } from '../cards/BasicCard'
import { Stack } from '@mui/system'
import { Box, Button, IconButton, Modal, Popover, Tab, Tabs } from '@mui/material'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectAuthUserToken } from 'features/authSlice';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProfileWithFullNameSubtitle } from './ProfileWithFullNameSubtitle';
import { NewChat } from './Message/NewChat';
import { UploadProfilePictureForm } from 'components/authentication/user/UploadProfilePictureForm';
import { useFetch } from 'hooks/useFetch';
import { MoreVertTwoTone, Report } from '@mui/icons-material';
import { ReportPanel } from 'components/ReportPanel';

export const ProfileContext = createContext()

export const Profile = () => {

    const { userId } = useParams()
    const authUser = useSelector(selectAuthUser)
    const [ profileData, setProfileData ] = useState(null)
    const navigate = useNavigate()
    const [ newChatOpen, setNewChatOpen ] = useState(false);
    const [ updateProfilePictureModal, setUpdateProfilePictureModal ] = useState(false)
    const [ requestedForRecommendation, setRequestedForRecommendation ] = useState(false)
    const fetch = useFetch()
    const [ reportModal, setReportModal ] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const location = useLocation()
    let rel_location = location.pathname.split("/")
    rel_location = rel_location.length === 3 ? "" : rel_location.at(-1)
    const [ selectedTab, setSelectedTab ] = useState('./' + rel_location)

    useEffect(() => {
        fetch(`/user/${userId}`, "GET", { onSuccess: (data) => { 
            setProfileData(data) 
            if (authUser.role === "ROLE_JOB_SEEKER" && data.role === "ROLE_JOB_CREATOR") 
                fetch(`/recommendations/check-request/${userId}`, "GET", { onSuccess: (data) => { setRequestedForRecommendation(data) } })
        } })
    }, [userId])

    const { profileRouteButtons, role, editable } = useMemo(() => getButtons(profileData, authUser), [profileData, authUser])
    const showRecommendBtn = profileData?.role === "ROLE_JOB_SEEKER" && authUser.role === "ROLE_JOB_CREATOR"
    const showRequestRecommendationBtn = profileData?.role === "ROLE_JOB_CREATOR" && authUser.role === "ROLE_JOB_SEEKER"

    const requestRecommendation = async () => {
        fetch('/recommendations/request', "POST", { data: { responderId: profileData.id }, successMsg: "Requested for recommendation", onSuccess: () => { setRequestedForRecommendation(true) } })
    }

    const deleteRequest = async () => {
        fetch(`/recommendations/delete?responder=${profileData.id}`, "DELETE", { successMsg: "Request deleted", onSuccess: () => { setRequestedForRecommendation(false) } })
    }

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
                <Stack direction={{ ...( !editable || showRecommendBtn ? { xs: 'column', md: 'row' } : { xs: 'row' } ) }} justifyContent={'space-between'} alignItems={ !(!editable && ( showRecommendBtn || showRequestRecommendationBtn )) ? "center" : undefined } spacing={2}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
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
                    {
                        authUser.id !== userId && (
                        <>
                            <IconButton onClick={(e) => { setAnchorEl(e.target) }}>
                                <MoreVertTwoTone/>
                            </IconButton>
                            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                                <Stack p={2} direction={'column'} spacing={1}>
                                    <Button startIcon={<Report/>} onClick={() => { setReportModal(true) }}>Report</Button>
                                    <Modal
                                        open={reportModal}
                                        onClose={() => setReportModal(false)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <ReportPanel type={'REPORT_USER'} onClose={() => { setReportModal(false) }} id={userId}/>
                                    </Modal>
                                </Stack>
                            </Popover>
                        </>
                        )
                    }
                    </Stack>
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                        <Stack spacing={2} direction="row">
                            { (!editable) && <Button onClick={() => { setNewChatOpen(true) }}>Message</Button> }
                            { showRecommendBtn && <Button onClick={() => { navigate(`/manage/recommendation/${profileData.id}`) }}>Recommend</Button> }
                            { showRequestRecommendationBtn && <Button onClick={ requestedForRecommendation ? deleteRequest : requestRecommendation}>{ requestedForRecommendation ? 'Cancel Reqeust' : 'Request Recommendation' }</Button> }
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
