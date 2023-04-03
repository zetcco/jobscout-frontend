import { AddIcCall, CallEnd, MicOff, Mic, PhoneDisabled, Videocam, VideocamOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Video } from "components/Video";
import { selectAuthUser } from "features/authSlice";
import { fetchMediaDevices, fetchMeeting, joinMeeting, leaveMeeting, selectMeetingCameraMute, selectMeetingConnected, selectMeetingError, selectMeetingInfo, selectMeetingLoading, selectMeetingLocalStream, selectMeetingMediaDevices, selectMeetingMicMute, selectMeetingRemoteVideos, setLocalPlaybackStream, toggleCameraMute, toggleMicMute } from 'features/meetSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

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

    useEffect(() => {
        dispatch(fetchMeeting({ link }))
        dispatch(fetchMediaDevices())
        dispatch(setLocalPlaybackStream())
    }, [dispatch, link])

    if (loading)
        return <CircularProgress/>

    if (error?.status === 404)
        navigate('/home')

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
                            <Button onClick={() => { dispatch(joinMeeting()) }} variant='outlined' size="large" startIcon={ <AddIcCall/> }>Leave</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            </Box>
        )
    }

    return (
        <Stack alignItems="center" direction="column" spacing={2}>
            <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
                <DeviceSelect width={200} label={"Select Video"} value={localStream.video} onChange={(e) => { dispatch(setLocalPlaybackStream({ video: e.target.value })) }} options={mediaDevices.videoDevices}/>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="audio-selector-label">Select Audio</InputLabel>
                    <Select label="Select Audio" labelId="audio-selector-label" value={localStream.audio} onChange={ (e) => { dispatch(setLocalPlaybackStream({ audio: e.target.value })) }}>
                        {
                            mediaDevices.audioDevices?.ids.map((deviceId, index) => (
                                <MenuItem key={index} value={mediaDevices.audioDevices.devices[deviceId]}>{mediaDevices.audioDevices.devices[deviceId].label}</MenuItem>
                            ))
                        } 
                    </Select>
                </FormControl>
                { !(meetingConnected) && (<Button onClick={() => { dispatch(joinMeeting()) }} variant='contained' startIcon={ <AddIcCall/> }>Join</Button>) }
                { (meetingConnected) && (<Button onClick={() => { dispatch(leaveMeeting()) }} variant='contained' color="error" startIcon={ <CallEnd/> } >Disconnect</Button>) }
                <Button onClick={() => { dispatch(toggleMicMute()) }} variant={ isMicMuted ? "contained" : "outlined" } color="error" startIcon={ isMicMuted ? <Mic/> : <MicOff/> }>{ isMicMuted ? "Unmute" : "Mute" }</Button>
                <Button onClick={() => { dispatch(toggleCameraMute()) }} variant={ isCameraMuted ? "outlined" : "contained" } color="error" startIcon={ isCameraMuted ? <Videocam/> : <VideocamOff/> }>{ isCameraMuted ? "Camera On" : "Camera Off" }</Button>
                { user.id === meetingInfo?.hoster.id && (<Button onClick={() => {}} variant='contained' disabled={remoteVideos.ids.length === 1} startIcon={ <PhoneDisabled/> } >End</Button>) }
            </Stack>
            <Grid container justifyContent={'center'} spacing={1}>
                {
                    remoteVideos.ids.map((id, index) => (
                        <Grid item xs={ remoteVideos.ids.length === 1 ? 12 : 6} md={remoteVideos.ids.length === 1 ? 12 : 4} key={index}>
                            <Video srcObject={remoteVideos.videos[id].stream} muted={id === 'local'}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>
    )
}

const DeviceSelect = ({ width, label, value, onChange, options }) => {
    return (
        <FormControl sx={{ width }} size={"small"}>
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