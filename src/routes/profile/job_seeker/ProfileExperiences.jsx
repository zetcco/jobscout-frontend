import { Alert, AlertTitle, Box, CircularProgress, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import PastExperiencesForm from 'components/authentication/user/job_seeker/PastExperiencesForm'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { ProfileContext } from 'components/profile/Profile'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditIcon } from '../EditIcon'

export const ProfileExperiences = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ experiences, setExperiences ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const [ updateExperiencesModal, setUpdateExperiencesModal ] = useState(false)
    const profileData = useContext(ProfileContext)

    useEffect(() => {
        const fetchQualifications = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/job-seeker/${userId}/experiences`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                setExperiences(response.data)
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
                    Experiences
                    { profileData.editable && (
                    <>
                        <EditIcon onClick={() => {setUpdateExperiencesModal(true)}}/>
                        <Modal
                            open={updateExperiencesModal}
                            onClose={() => setUpdateExperiencesModal(!updateExperiencesModal)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box sx={{
                                width: { xs: '95%', md: '75%', lg: '60%' }
                            }}>
                            <PastExperiencesForm onUpdate={(data) => {
                                setExperiences(data)
                                setUpdateExperiencesModal(false)
                            }}
                            onCancel={() => setUpdateExperiencesModal(false)}
                            />
                            </Box>
                        </Modal>
                    </>
                    )}
                </>
            } noElevation padding={{ xs: 2 }}>
                <Stack spacing={2}>
                    {
                        experiences.length !== 0 ? experiences.map( (experience, key) => (
                            <Stack direction={"row"} alignItems={'center'} spacing={2} color={"grey.800"} key={key}>
                                    <AvatarWithInitials src={experience.organization.displayPicture} name={experience.organization.displayName}/>
                                    <Stack>
                                        <Typography fontWeight={600}>{ experience.jobTitle.name }</Typography>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography fontWeight={400}>{ experience.organization.displayName }</Typography>
                                            <Typography fontWeight={300}>{ `(${experience.startYear} - ${experience.endYear})` }</Typography>
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
