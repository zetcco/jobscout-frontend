import { AddIcCall, CallEnd, MicOff, Mic, PhoneDisabled, Videocam, VideocamOff, Code, CodeOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Tooltip, Typography } from '@mui/material'
import { Video } from "components/Video";
import { selectAuthUser } from "features/authSlice";
import { fetchMediaDevices, fetchMeeting, joinMeeting, leaveFromJoin, leaveMeeting, selectMeetingCameraMute, selectMeetingConnected, selectMeetingError, selectMeetingInfo, selectMeetingLoading, selectMeetingLocalStream, selectMeetingMediaDevices, selectMeetingMicMute, selectMeetingRemoteVideos, setLocalPlaybackStream, toggleCameraMute, toggleMicMute } from 'features/meetSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { CodingInterview } from "routes/CodingInterview";

export const Meet = () => {

    const { link } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectAuthUser)
    const meetingInfo = useSelector(selectMeetingInfo)
    const mediaDevices = useSelector(selectMeetingMediaDevices)
    const remoteVideos = useSelector(selectMeetingRemoteVideos)
    const localStream = useSelector(selectMeetingLocalStream)
    const meetingConnected = useSelector(selectMeetingConnected)
    const error = useSelector(selectMeetingError)
    const isMicMuted = useSelector(selectMeetingMicMute)
    const isCameraMuted = useSelector(selectMeetingCameraMute)
    const loading = useSelector(selectMeetingLoading)

    const [ codeOpened, setCodeOpened ] = useState(false)

    useEffect(() => {
        dispatch(fetchMeeting({ link }))
        dispatch(fetchMediaDevices())
        dispatch(setLocalPlaybackStream())

        return () => { dispatch(leaveFromJoin()) }
    }, [dispatch, link])

    if (loading)
        return <CircularProgress/>

    if (error?.status === 404)
        return <Typography>Meeting has ended or Invalid meeting link</Typography>

    if (!meetingConnected) {
        return (
            <Box sx={{ height: { md: 'calc(100vh - 100px)' } }}>
            <Stack direction={{ xs: "column", md: "row" }} height={'100%'} alignItems={'center'} justifyContent={'center'} mx={{ xs: 2, md: 20 }}>
                <Stack direction={"column"} alignItems={'center'} spacing={2} sx={{ width: { md: '50%' } }}>
                    <Box sx={{ width: '100%' }}>
                        <Video srcObject={remoteVideos.videos['local']?.stream} muted={true} controls={
                            <Stack direction={"row"} spacing={1}>
                                <Button onClick={() => { dispatch(toggleMicMute()) }} variant={ isMicMuted ? "contained" : "outlined" } color="error" sx={{ aspectRatio: '1/1' }}>{ isMicMuted ? <Mic/> : <MicOff/> }</Button>
                                <Button onClick={() => { dispatch(toggleCameraMute()) }} variant={ isCameraMuted ? "contained" : "outlined" } color="error" sx={{ aspectRatio: '1/1' }}>{ isCameraMuted ? <Videocam/> : <VideocamOff/> }</Button>
                            </Stack>
                        }/>
                    </Box>
                    <Stack direction={"row"} spacing={1} width={'100%'}>
                        <DeviceSelect width={'50%'} label={"Select Video"} value={localStream.video} onChange={(e) => { dispatch(setLocalPlaybackStream({ video: e.target.value })) }} options={mediaDevices.videoDevices}/>
                        <DeviceSelect width={'50%'} label={"Select Audio"} value={localStream.audio} onChange={(e) => { dispatch(setLocalPlaybackStream({ audio: e.target.value })) }} options={mediaDevices.audioDevices}/>
                    </Stack>
                </Stack>
                <Stack direction={"column"} alignItems={'center'} sx={{ width: { md: '50%' } }}>
                    <Stack direction={"column"} alignItems={'center'} spacing={4} width={ { xs: '100%', md: '60%' } }>
                        <Typography align={'center'}>Here, You can setup your Camera and Mic and test everything works before joining</Typography>
                        <Typography variant="h4">Ready to join?</Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Button onClick={() => { dispatch(joinMeeting()) }} variant='contained' size="large" startIcon={ <AddIcCall/> }>Join</Button>
                            <Button onClick={() => { navigate('/home') }} variant='outlined' size="large" startIcon={ <AddIcCall/> }>Leave</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            </Box>
        )
    }

    return (
        <Stack direction="row" sx={{ width: '100%' }}>
            { codeOpened && (
                <Box sx={{ width: '80%' }}>
                    <CodingInterview/>
                </Box>
            ) }
            <Stack alignItems="center" direction="column" spacing={2} mt={3} sx={{ flexGrow: 1, width: codeOpened ? "20%" : undefined }}>
                <Stack direction={{ sm: "column", md: "row" }} spacing={2} alignItems={'center'} justifyContent={'center'}>
                    <Stack direction={"row"} spacing={1}>
                        { !codeOpened && (<>
                            <DeviceSelect size="medium" width={150} label={"Select Video"} value={localStream.video} onChange={(e) => { dispatch(setLocalPlaybackStream({ video: e.target.value })) }} options={mediaDevices.videoDevices}/>
                            <DeviceSelect size="medium" width={150} label={"Select Audio"} value={localStream.audio} onChange={(e) => { dispatch(setLocalPlaybackStream({ audio: e.target.value })) }} options={mediaDevices.audioDevices}/>
                        </>)}
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        <Button onClick={() => { dispatch(toggleMicMute()) }} variant={ isMicMuted ? "contained" : "outlined" } color="error" size="small" sx={{ aspectRatio: '1/1' }}>{ isMicMuted ? <Mic fontSize="small"/> : <MicOff fontSize="small"/> }</Button>
                        <Button onClick={() => { dispatch(toggleCameraMute()) }} variant={ isCameraMuted ? "contained" : "outlined" } color="error" size="small" sx={{ aspectRatio: '1/1' }}>{ isCameraMuted ? <Videocam fontSize="small"/> : <VideocamOff fontSize="small"/> }</Button>
                        { user.role === "ROLE_JOB_SEEKER" && (
                            <Tooltip title={ codeOpened ? "Close code editor and stop Screen sharing" : "Open code editor and Share your screen" }>
                                <Button onClick={() => { setCodeOpened((prevState) => !prevState) }} variant='contained' >{ codeOpened ? <CodeOff/> : <Code/> }</Button>
                            </Tooltip>
                        ) }
                        <Button onClick={() => { dispatch(leaveMeeting()) }} variant='contained' color="error" sx={{ aspectRatio: '1/1' }}><CallEnd/></Button>
                        { user.id === meetingInfo?.hoster.id && (<Button onClick={() => {}} variant='contained' startIcon={ <PhoneDisabled/> } >End</Button>) }
                    </Stack>
                </Stack>
                <div style={{
                    display: 'grid',
                    gap: '1rem',
                    width: '100%',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                }}>
                    {
                        remoteVideos.ids.map((id, index) => (
                            <Video srcObject={remoteVideos.videos[id].stream} muted={id === 'local'} key={index}/>
                        ))
                    }
                </div>
            </Stack>
        </Stack>
    )
}

const DeviceSelect = ({ width, size, label, value, onChange, options }) => {
    return (
        <FormControl sx={{ width }} size={size ? size : "small"}>
            <InputLabel id="selector-label">{label}</InputLabel>
            <Select label={label} labelId="selector-label" value={value} onChange={onChange}>
                {
                    options?.ids.map((deviceId, index) => (
                        <MenuItem key={index} value={options.devices[deviceId]}>{options.devices[deviceId].label}</MenuItem>
                    ))
                } 
            </Select>
        </FormControl>
    )
}