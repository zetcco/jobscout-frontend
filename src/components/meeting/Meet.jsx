import { AddIcCall, CallEnd, MicOff, Mic, PhoneDisabled, Videocam, VideocamOff } from "@mui/icons-material";
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { Video } from "components/Video";
import { selectAuthUser } from "features/authSlice";
import { fetchMediaDevices, fetchMeeting, joinMeeting, leaveMeeting, selectMeetingCameraMute, selectMeetingConnected, selectMeetingError, selectMeetingInfo, selectMeetingLoading, selectMeetingLocalStream, selectMeetingMediaDevices, selectMeetingMicMute, selectMeetingRemoteVideos, setLocalPlaybackStream, setLocalStream, toggleCameraMute, toggleMicMute } from 'features/meetSlice'
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

    return (
        <Stack alignItems="center" direction="column" spacing={2}>
            <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="video-selector-label">Select Video</InputLabel>
                    <Select label="Select Video" labelId="video-selector-label" value={localStream.video} onChange={ (e) => { dispatch(setLocalPlaybackStream({ video: e.target.value })) }}>
                        {
                            mediaDevices.videoDevices?.ids.map((deviceId, index) => (
                                <MenuItem key={index} value={mediaDevices.videoDevices.devices[deviceId]}>{mediaDevices.videoDevices.devices[deviceId].label}</MenuItem>
                            ))
                        } 
                    </Select>
                </FormControl>
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
            <Grid container>
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
