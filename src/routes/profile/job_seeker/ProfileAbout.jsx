import { CallRounded, EmailRounded, FacebookRounded, GitHub, LinkedIn, Public, Web } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { ProfileContext } from 'components/profile/Profile'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken, serverClient } from 'features/authSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Intro } from 'routes/signup/users/job_seeker/Intro'
import { EditIcon } from '../EditIcon'
import { A, RouterLink } from 'components/RouterLink'
import AddSocialsForm from 'components/authentication/user/job_seeker/AddSocialsForm'

export const ProfileAbout = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ about, setAbout ] = useState({
        intro: null,
        email: null,
        phone: null,
        socials: []
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const [ updateIntroModal, setUpdateIntroModal ] = useState(false)
    const [ updateSocialModal, setUpdateSocialModal ] = useState(false)

    const profileData = useContext(ProfileContext);

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                
                // Fetch contacts
                let response = await axios.get(`/user/${userId}/contacts`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                setAbout(response.data)

                // Set Job Seeker Introduction paragraph
                if (response.data.role === "ROLE_JOB_SEEKER") {
                    const response = await axios.get(`/job-seeker/${userId}/intro`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                    setAbout((prevState) => ({ ...prevState, intro: response.data }))
                }

                // Fetch Social links
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
                    {about.socials.length !== 0 ? (
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
