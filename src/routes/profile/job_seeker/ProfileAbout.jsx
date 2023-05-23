import { CallRounded, EmailRounded, FacebookRounded, GitHub, LinkedIn, Public } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { ProfileContext } from 'components/profile/Profile'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken, serverClient } from 'features/authSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Intro } from 'routes/signup/users/job_seeker/Intro'
import { EditIcon } from '../EditIcon'
import { A } from 'components/RouterLink'
import AddSocialsForm from 'components/authentication/user/job_seeker/AddSocialsForm'
import { UploadIntroVideoForm } from 'components/authentication/user/UploadIntroVideoForm'
import ProfileHeaderCard from 'components/profile/ProfileHeaderCard'

export const ProfileAbout = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ about, setAbout ] = useState({
        intro: null,
        introVideo: null,
        email: null,
        phone: null,
        socials: []
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const [ updateIntroModal, setUpdateIntroModal ] = useState(false)
    const [ updateSocialModal, setUpdateSocialModal ] = useState(false)
    const [ updateIntroVideoModal, setUpdateIntroVideoModal ] = useState(false)
    const [ organizationProfile, setOrganizationProfile ] = useState()

    const profileData = useContext(ProfileContext);

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                
                let response = await serverClient.get(`/user/${userId}/contacts`)
                setAbout(response.data)

                if (response.data.role === "ROLE_JOB_SEEKER") {
                    response = await serverClient.get(`/job-seeker/${userId}/intro`)
                    setAbout((prevState) => ({ ...prevState, intro: response.data }))

                    response = await serverClient.get(`/job-seeker/${userId}/intro-video`)
                    setAbout((prevState) => ({ ...prevState, introVideo: response.data }))
                }

                if (response.data.role === "ROLE_JOB_CREATOR") {
                    console.log(response.data)
                    response = await serverClient.get(`/jobcreator/organization?jobCreator=${userId}`)
                    if (response.status === 200)
                        setOrganizationProfile(response.data)
                }

                response = await serverClient.get(`/user/${userId}/socials`)
                setAbout((prevState) => ({ ...prevState, socials: response.data }))

            } catch (e) {
                setError(e.response.data)
            }
            setLoading(false)
        }
        fetchQualifications()
    }, [userId, authToken])

    if (loading)
        return (
            <Stack width={"100%"} alignItems={'center'}>
                <CircularProgress/>
            </Stack>
        )
    
    if (error)
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{error.message}</strong>
            </Alert>
        )

    return (
        <Stack spacing={3}>
                <SmallPanel mainTitle={
                    <>
                        Introduction
                        { profileData.editable && (
                        <>
                            <EditIcon onClick={() => {setUpdateIntroModal(true)}}/>
                            <Modal
                                open={updateIntroModal}
                                onClose={() => setUpdateIntroModal(!updateIntroModal)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Intro onUpdate={(data) => {
                                    setAbout((prevState) => ({ ...prevState, intro: data }))
                                    setUpdateIntroModal(false)
                                }}
                                onCancel={() => setUpdateIntroModal(false)}
                                />
                            </Modal>
                        </>
                        )}
                    </>
                } noElevation padding={{ xs: 1 }}>
                {about.intro ? (
                    <Typography>{about.intro}</Typography>
                ) : ( 
                    profileData.editable ? (
                        <Box><Button onClick={() => {setUpdateIntroModal(true)}} >Add a Introduction</Button></Box>
                        ) : (
                            <Typography variant='body2'>No introduction</Typography>
                        ) )}
                </SmallPanel>
                { profileData.role === "ROLE_JOB_SEEKER" && (
                    <SmallPanel mainTitle={
                        <>
                            Introduction Video
                            { profileData.editable && (
                            <>
                                <EditIcon onClick={() => {setUpdateIntroVideoModal(true)}}/>
                                <Modal
                                    open={updateIntroVideoModal}
                                    onClose={() => setUpdateIntroVideoModal(!updateIntroModal)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <UploadIntroVideoForm
                                        onUpdate={(data) => {
                                            setAbout((prevState) => ({ ...prevState, introVideo: data }))
                                            setUpdateIntroVideoModal(false)
                                        }}
                                        onCancel={() => setUpdateIntroVideoModal(false)}
                                    />
                                </Modal>
                            </>
                            )}
                        </>
                    } noElevation padding={{ xs: 1 }}>
                        {about.introVideo ? (
                            <Box width={{ xs: '100%', md: '50%' }}>
                                <video src={about.introVideo} controls width={'100%'}/>
                            </Box>
                        ) : ( 
                            profileData.editable ? (
                                <Box><Button onClick={() => {setUpdateIntroVideoModal(true)}} >Add a Introduction Video</Button></Box>
                                ) : (
                                    <Typography variant='body2'>No introduction Video</Typography>
                                ) )}
                    </SmallPanel>
                )}
                { profileData.role === "ROLE_JOB_CREATOR" && (
                    <SmallPanel mainTitle={ 'Organization'} noElevation padding={{ xs: 1 }}>
                        { organizationProfile ? (<ProfileHeaderCard name={organizationProfile.displayName} src={organizationProfile.displayPicture}/> ) : <Typography variant='body2'>No Organization</Typography> }
                    </SmallPanel>
                )}
            <SmallPanel mainTitle={"Contact"} noElevation padding={{ xs: 1 }}>
                <Stack spacing={2}>
                    {
                        about.phone && (
                            <Stack direction={"row"} spacing={1} color={"grey.800"}>
                                <CallRounded/>
                                <Typography fontWeight={600}>{ about.phone }</Typography>
                            </Stack>
                        )
                    }
                    {
                        about.email && (
                            <Stack direction={"row"} spacing={1} color={"grey.800"}>
                                <EmailRounded/>
                                <Typography fontWeight={600}>{ about.email }</Typography>
                            </Stack>
                        )
                    }
                </Stack>
            </SmallPanel>
            <SmallPanel noElevation padding={{ xs: 1 }} mainTitle={
                    <>
                        Socials
                        { profileData.editable && (
                        <>
                            <EditIcon onClick={() => {setUpdateSocialModal(true)}}/>
                            <Modal
                                open={updateSocialModal}
                                onClose={() => setUpdateSocialModal(!updateSocialModal)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <AddSocialsForm onUpdate={(data) => {
                                    setAbout((prevState) => ({ ...prevState, socials: data }))
                                    setUpdateSocialModal(false)
                                }}
                                onCancel={() => setUpdateSocialModal(false)}
                                />
                            </Modal>
                        </>
                        )}
                    </>
                }>
                    {about.socials?.length !== 0 ? (
                        <Stack spacing={2} direction={"row"}>
                        {
                            about.socials.map( (social, index) => {
                            const icon = social.platform === "SOCIAL_FACEBOOK" ? <FacebookRounded/> : (
                                        social.platform === "SOCIAL_GITHUB" ? <GitHub/> : (
                                        social.platform === "SOCIAL_LINKEDIN" ? <LinkedIn/> : <Public/>
                                        )
                            )
                            return (
                                <Stack direction={"row"} spacing={1} key={index} color={"grey.800"}>
                                    <A href={social.link}>
                                        { icon }
                                    </A>
                                </Stack>
                            )})
                        }
                        </Stack>
                    ) : ( 
                        profileData.editable ? (
                            <Box><Button onClick={() => {setUpdateSocialModal(true)}} >Add Socials</Button></Box>
                            ) : (
                                <Typography variant='body2'>No socials</Typography>
                            ) )}
            </SmallPanel>
        </Stack>
    )
}
