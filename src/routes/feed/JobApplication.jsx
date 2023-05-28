import { CheckCircleOutline, DeleteOutline, DoneAllTwoTone } from '@mui/icons-material'
import { Button, Chip, Popover, Stack, TextField, Typography } from '@mui/material'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { ResponsiveIconButton } from 'components/ResponsiveIconButton'
import { RouterLink } from 'components/RouterLink'
import { BasicCard } from 'components/cards/BasicCard'
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'
import { getDateWithAddition } from 'components/meeting/ScheduleMeeting'

export const JobApplication = ({ application, onReject, onAccept, onInterview, onComplete }) => {

    const [showInterview, setShowInterview] = useState(null)
    const [ timestamp, setTimestamp ] = useState(getDateWithAddition(1));
    const [ startTime, setStartTime ] = useState(null);

    return (
        <BasicCard sx={{ width: '100%' }}>
            <Stack direction={'row'} spacing={{ xs: 2, md: 10 }} alignItems={'center'} justifyContent={'space-between'}>
                <RouterLink to={`/users/${application.jobSeeker.id}`}>
                <Stack direction={'row'} spacing = {2} alignItems={'center'}>
                    <AvatarWithInitials size={{ xs: 60, md: 70 }} src={application.jobSeeker.displayPicture} name={application.jobSeeker.displayName}/>
                    <Stack direction={'column'} spacing={0.2}>
                        <Typography variant='h5' fontWeight={600}>{ application.jobSeeker.displayName }</Typography>
                        <Typography fontSize={16}>{ application.jobSeeker.email }</Typography> 
                    </Stack>                      
                </Stack>
                </RouterLink>
                { application.status === "INTERVIEW_SELECTED" && <Chip label="Interview Called" variant="outlined"/> }
                { application.status === "ACCEPTED" && <Chip label="Accepted" variant="outlined" color='success'/> }
                { application.status === "REJECTED" && <Chip label="Rejected" variant="outlined" color='error'/> }
                { application.status === "APPLIED" && <Chip label="Not Decided" variant="outlined" color='info'/> }
                { application.status === "COMPLETED" && <Chip label="Completed" variant="outlined" color='warning'/> }
                { application.status === "REJECTED" && (
                    <ResponsiveIconButton startIcon={<CheckCircleOutline/>}
                        onClick={() => { onAccept(application.id) }}
                        disabled={application.status === "ACCEPTED"}
                    >Accept</ResponsiveIconButton>
                ) }
                { application.status === "ACCEPTED" && (
                <Stack direction={'row'} spacing={1}>
                    <ResponsiveIconButton color={'error'} startIcon={<DeleteOutline/>} 
                        onClick={() => { onReject(application.id) }}
                        disabled={application.status === "REJECTED"}
                    >Reject</ResponsiveIconButton>

                    { application.status === "ACCEPTED" && 
                        (
                        <>
                        <ResponsiveIconButton startIcon={<CheckCircleOutline/>} onClick={e => { setShowInterview(e.currentTarget) }} >Interview</ResponsiveIconButton> 
                        <Popover open={Boolean(showInterview)} onClose={() => { setShowInterview(null) }} anchorEl={showInterview} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Stack m={2} spacing={1} sx={{ width: { xs: 400 } }}>
                        <Typography variant="body2">Pick a date for the interview</Typography>
                        <Stack direction={'row'} spacing={1}>
                            <TextField
                                type="date"
                                value={timestamp.toLocaleDateString('en-CA')}
                                onChange={(e) => { setTimestamp(new Date( e.target.value )) }}
                                fullWidth
                                inputProps={{
                                    min: (getDateWithAddition(1).toLocaleDateString('en-CA'))
                                }}
                            />
                            <TextField label="Day(s)" type={'number'} value={Math.ceil((timestamp - new Date())/(1000 * 60 * 60 * 24))} onChange={e => { 
                                setTimestamp(getDateWithAddition(parseInt(e.target.value))) 
                            }} inputProps={{ min: 1 }}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker sx={{ width: '100%' }} label="Time" value={startTime} onChange={setStartTime} />
                            </LocalizationProvider>
                        </Stack>
                        <Button variant="contained" onClick={() => { 
                            onInterview(application.id, startTime, timestamp) 
                            setShowInterview(null)
                        }} disabled={startTime === null}>Schedule Now</Button>
                        </Stack>
                        </Popover>
                        </>) }
                </Stack> )
                }
                {
                application.status === "INTERVIEW_SELECTED" && (
                    <ResponsiveIconButton startIcon={<DoneAllTwoTone/>}
                        onClick={() => { onComplete(application.id) }}
                    > Mark as Complete</ResponsiveIconButton>
                )}
            </Stack>
        </BasicCard>
    )
}
