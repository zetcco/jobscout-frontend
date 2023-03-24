import { CallRounded, EmailRounded } from '@mui/icons-material'
import { Alert, AlertTitle, CircularProgress, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { ProfileContext } from 'components/profile/Profile'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Intro } from 'routes/signup/users/job_seeker/Intro'
import { EditIcon } from '../EditIcon'

export const ProfileAbout = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ about, setAbout ] = useState({
        intro: null,
        email: null,
        phone: null
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const [ updateIntroModal, setUpdateIntroModal ] = useState(false)

    const profileData = useContext(ProfileContext);

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/user/${userId}/contacts`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                setAbout(response.data)
                if (response.data.role === "ROLE_JOB_SEEKER") {
                    const response = await axios.get(`/job-seeker/${userId}/intro`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                    setAbout((prevState) => ({ ...prevState, intro: response.data }))
                }
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
            {   about.intro && (
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
                    <Typography>{about.intro}</Typography>
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
        </Stack>
    )
}
