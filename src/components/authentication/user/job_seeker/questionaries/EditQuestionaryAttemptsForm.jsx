import { Button, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import { selectAuthUserId, serverClient } from 'features/authSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const EditQuestionaryAttemptsForm = () => {

    const [ skillQualifications, setSkillQualifications ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    
    const userId = useSelector(selectAuthUserId)

    useEffect(() => {
        const fetchExisting = async () => {
            setLoading(true)
            try {
                const response = await serverClient.get(`/questionary/attempts?jobSeekerId=${userId}`)
                setSkillQualifications(response.data)
            } catch (e) {
                setError(e)
            }
            setLoading(false)
        }
        fetchExisting()
    }, [])

    if (loading)
        return 
        <CenteredHeaderCard title={'Change Test Result Visibility '}>
            <CircularProgress/>
        </CenteredHeaderCard>
    
    return (
        <CenteredHeaderCard
            title={'Change Test Result Visibility'}
            footer={
                <Stack direction={'row'}>
                    <Button variant='outlined'>Cancel</Button>
                    <Button variant='contained'>Save</Button>
                </Stack>
        }>
        <Stack spacing={2}>
            {
                skillQualifications.length !== 0 && skillQualifications.some(e => e.isPublic === true) ? skillQualifications.map( (qualification, index) => qualification.isPublic ? (
                    <Stack direction={"row"} alignItems={'center'} spacing={2} color={"grey.800"} key={index}>
                        { qualification.questionary.badge && ( <img style={{ width: 60, height: 60 }} src={qualification.questionary.badge} />) }
                        <Stack>
                            <Typography fontWeight={600}>{ qualification.questionary.name }</Typography>
                            <Stack direction={'row'} spacing={2} sx={{ width: '100%' }} alignItems={'center'}>
                                <Typography fontWeight={400}>{ qualification.score.toFixed(1) }</Typography>
                                <LinearProgress variant='determinate' value={qualification.score} style={{ width: '100%' }}/>
                            </Stack>
                        </Stack>
                    </Stack>
                ) : null ) : (
                    <Typography variant='body2'>Nothing to show here</Typography>
                )
            }
        </Stack>
        </CenteredHeaderCard>
    )
}
