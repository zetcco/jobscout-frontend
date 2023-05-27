import { LightbulbCircleRounded } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Chip, CircularProgress, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { AddSkillsForm } from 'components/authentication/user/job_seeker/AddSkillsForm'
import { ProfileContext } from 'components/profile/Profile'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditIcon } from '../EditIcon'

export const ProfileSkills = () => {
    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)
    const [ skillSets, setSkillSets ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ updateSkillSetsModal, setUpdateSKillSetsModal ] = useState(false)

    const profileData = useContext(ProfileContext);

    useEffect(() => {
        const fetchSkillSets = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/job-seeker/${userId}/skillset`, { headers: { Authorization: `Bearer ${authToken}` } })
                setSkillSets(response.data)
            } catch (e) {
                setError(e.response.data)
            }
            setLoading(false)
        }
        fetchSkillSets()
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
        <Stack spacing={4}>
            <SmallPanel mainTitle={
                <>
                    Skills
                    { profileData.editable && (
                    <>
                        <EditIcon onClick={() => {setUpdateSKillSetsModal(true)}}/>
                        <Modal
                            open={updateSkillSetsModal}
                            onClose={() => setUpdateSKillSetsModal(!updateSkillSetsModal)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box sx={{
                                width: { xs: '95%', md: '75%', lg: '60%' }
                            }}>
                            <AddSkillsForm onUpdate={(data) => {
                                setSkillSets(data)
                                setUpdateSKillSetsModal(false)
                            }}
                            onCancel={() => setUpdateSKillSetsModal(false)}
                            />
                            </Box>
                        </Modal>
                    </>
                    )}
                </>
            } noElevation padding={{ xs: 2 }}>
                <Stack spacing={2}>
                    {
                        skillSets.length !== 0 ? skillSets.map( (skillSet, index) => (
                            <Stack direction={"row"} alignItems={'center'} spacing={2} color={"grey.800"} key={index}>
                                <LightbulbCircleRounded/>
                                <Stack spacing={1}>
                                    <Typography fontWeight={600}>{ skillSet.category.name }</Typography>
                                    <Stack direction={"row"} spacing={1}>
                                        {skillSet.skills.map( (skill) => (
                                            <Chip size='small' label={skill.name} color='primary' variant='outlined' key={skill.id}/>
                                        ))}
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
