import { SchoolRounded } from '@mui/icons-material'
import { Alert, AlertTitle, Box, CircularProgress, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import EducationQualificationForm from 'components/authentication/user/job_seeker/EducationQualificationForm'
import { ProfileContext } from 'components/profile/Profile'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditIcon } from '../EditIcon'

export const ProfileQualifications = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ qualifications, setQualifications ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ updateQualificationsModal, setUpdateQualificationsModal ] = useState(false)

    const profileData = useContext(ProfileContext);

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/job-seeker/${userId}/qualifications`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                setQualifications(response.data)
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
                    Qualifications
                    { profileData.editable && (
                    <>
                        <EditIcon onClick={() => {setUpdateQualificationsModal(true)}}/>
                        <Modal
                            open={updateQualificationsModal}
                            onClose={() => setUpdateQualificationsModal(!updateQualificationsModal)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box sx={{
                                width: { xs: '95%', md: '75%', lg: '60%' }
                            }}>
                            <EducationQualificationForm onUpdate={(data) => {
                                setQualifications(data)
                                setUpdateQualificationsModal(false)
                            }}
                            onCancel={() => setUpdateQualificationsModal(false)}
                            />
                            </Box>
                        </Modal>
                    </>
                    )}
                </>
            } noElevation padding={{ xs: 1 }}>
                <Stack spacing={2}>
                    {
                        qualifications.length !== 0 ? qualifications.map( (qualification, index) => (
                            <Stack direction={"row"} alignItems={'center'} spacing={2} color={"grey.800"} key={index}>
                                <SchoolRounded/>
                                <Stack>
                                    <Typography fontWeight={600}>{ qualification.degree.name }</Typography>
                                    <Stack direction={"row"} spacing={1}>
                                        <Typography fontWeight={400}>{ qualification.institute.name }</Typography>
                                        <Typography fontWeight={300}>{ `(${qualification.startYear} - ${qualification.endYear})` }</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )) : (
                            <Typography variant='body2'>Nothing to show here</Typography>
                        )
                    }
                </Stack>
            </SmallPanel>
        </Stack>
    )
}
