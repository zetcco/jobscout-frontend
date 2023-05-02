import { AddIcCall, CallEnd, MicOff, Mic, PhoneDisabled, Videocam, VideocamOff, Code, CodeOff, ScreenShare, StopCircle, ExitToApp } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, Tooltip, Typography } from '@mui/material'
import { Video } from "components/Video";
import { selectAuthUser } from "features/authSlice";
import { fetchMediaDevices, fetchMeeting, joinMeeting, leaveFromJoin, leaveMeeting, selectMeetingCameraMute, selectMeetingConnected, selectMeetingError, selectMeetingInfo, selectMeetingLoading, selectMeetingLocalStream, selectMeetingMediaDevices, selectMeetingMicMute, selectMeetingRemoteVideos, setLocalPlaybackStream, toggleCameraMute, toggleMicMute, toggleScreenShare, selectMeetingIsLocalScreenShared, selectMeetingCanShareScreen, endMeeting } from 'features/meetSlice'
import { useFetch } from "hooks/useFetch";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { CodingInterview } from "routes/CodingInterview";

export const Meet = () => {

    const { link } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ endMeetingConfirm, setEndMeetingConfirm ] = useState(false)
    const fetch = useFetch()

    const user = useSelector(selectAuthUser)
    const meetingInfo = useSelector(selectMeetingInfo)
    const mediaDevices = useSelector(selectMeetingMediaDevices)
    const remoteVideos = useSelector(selectMeetingRemoteVideos)
    const localStream = useSelector(selectMeetingLocalStream)
    const meetingConnected = useSelector(selectMeetingConnected)
    const error = useSelector(selectMeetingError)
    const isMicMuted = useSelector(selectMeetingMicMute)
    const isCameraMuted = useSelector(selectMeetingCameraMute)
    const isLocalScreenShared = useSelector(selectMeetingIsLocalScreenShared)
    const canShareScreen = useSelector(selectMeetingCanShareScreen)
    const loading = useSelector(selectMeetingLoading)

    const [ codeOpened, setCodeOpened ] = useState(false)

    useEffect(() => {
        dispatch(fetchMeeting({ link }))
        dispatch(fetchMediaDevices())
        dispatch(setLocalPlaybackStream())

        return () => { dispatch(leaveFromJoin()) }
    }, [dispatch, link])

    if (loading)
        return (
        <Box sx={{ height: { md: 'calc(100vh - 100px)' } }}>
            <Stack direction={{ xs: "column", md: "row" }} height={'100%'} alignItems={'center'} justifyContent={'center'} mx={{ xs: 2, md: 20 }}>
                <CircularProgress/>
            </Stack>
        </Box> )

    if (error?.status === 404)
        return (
        <Box sx={{ height: { md: 'calc(100vh - 100px)' } }}>
            <Stack direction={{ xs: "column", md: "row" }} height={'100%'} alignItems={'center'} justifyContent={'center'} mx={{ xs: 2, md: 20 }}>
                <Typography variant="h5">Meeting has ended or Invalid meeting link</Typography>
            </Stack>
        </Box> )

    if (!meetingConnected) {
        return (
            <Box sx={{ height: { md: 'calc(100vh - 100px)' } }}>
            <Stack direction={{ xs: "column", md: "row" }} height={'100%'} alignItems={'center'} justifyContent={'center'} mx={{ xs: 2, md: 20 }}>
                <Stack direction={"column"} alignItems={'center'} spacing={2} sx={{ width: { md: '50%' } }}>
                    <Box sx={{ width: '100%' }}>
                        <Video srcObject={remoteVideos.videos.local?.localStream} muted={true} controls={
                            <Stack direction={"row"} spacing={1}>
                                <Button onClick={() => { dispatch(toggleMicMute()) }} variant={ isMicMuted ? "outlined" : "contained" } color="error" sx={{ aspectRatio: '1/1' }}>{ isMicMuted ? <MicOff/> : <Mic/> }</Button>
                                <Button onClick={() => { dispatch(toggleCameraMute()) }} variant={ isCameraMuted ? "outlined" : "contained" } color="error" sx={{ aspectRatio: '1/1' }}>{ isCameraMuted ? <VideocamOff/> : <Videocam/> }</Button>
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
                            <Button onClick={() => { 
                                fetch(`/meeting/${link}`, "GET", { successMsg: "Joined Meeting", errorMsg: "Failed to join. Meeting not found.", onSuccess: () => {
                                    dispatch(joinMeeting()) 
                                }, onError: (error) => {
                                    if (error.response.data.status === 404)
                                        navigate('/home')
                                }})
                                }} variant='contained' size="large" startIcon={ <AddIcCall/> }>Join</Button>
                            <Button onClick={() => { navigate('/home') }} variant='outlined' size="large" startIcon={ <ExitToApp/> }>Leave</Button>
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
                <Box sx={{ width: '75%' }}>
                    <CodingInterview/>
                </Box>
            ) }
            <Stack alignItems="center" direction="column" spacing={2} mt={3} sx={{ flexGrow: 1, width: codeOpened ? "25%" : undefined }}>
                <Stack direction={{ sm: "column", md: "row" }} spacing={2} alignItems={'center'} justifyContent={'center'}>
                    <Stack direction={"row"} spacing={1}>
                        { !codeOpened && (<>
                            <DeviceSelect disabled={isLocalScreenShared} size="medium" width={150} label={"Select Video"} value={localStream.video} onChange={(e) => { dispatch(setLocalPlaybackStream({ video: e.target.value })) }} options={mediaDevices.videoDevices}/>
                            <DeviceSelect disabled={isLocalScreenShared} size="medium" width={150} label={"Select Audio"} value={localStream.audio} onChange={(e) => { dispatch(setLocalPlaybackStream({ audio: e.target.value })) }} options={mediaDevices.audioDevices}/>
                        </>)}
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        <Tooltip title={isMicMuted ? "Mute microphone" : "Unmute Microphone"}>
                            <Button onClick={() => { dispatch(toggleMicMute()) }} variant={ isMicMuted ? "outlined" : "contained" } color="error" sx={{ aspectRatio: '1/1' }}>{ isMicMuted ? <MicOff/> : <Mic/> }</Button>
                        </Tooltip>
                        <Tooltip title={isCameraMuted ? "Turn off your camera" : "Turn on your camera"}>
                            <Button onClick={() => { dispatch(toggleCameraMute()) }} variant={ isCameraMuted ? "outlined" : "contained" } color="error" sx={{ aspectRatio: '1/1' }}>{ isCameraMuted ? <VideocamOff/> : <Videocam/> }</Button>
                        </Tooltip>
                        <Tooltip title={ isLocalScreenShared ? "Turn off screen Sharing" : "Share your screen" }>
                            <Button disabled={!canShareScreen} onClick={() => { dispatch(toggleScreenShare()) }} variant={ isLocalScreenShared ? "outlined" : "contained" } color="error" size="small" sx={{ aspectRatio: '1/1' }}>{ isLocalScreenShared ? <StopCircle fontSize="small"/> : <ScreenShare fontSize="small"/> }</Button>
                        </Tooltip>
                        { user.role === "ROLE_JOB_SEEKER" && (
                            <Tooltip title={ codeOpened ? "Close code editor and stop Screen sharing" : "Open code editor" }>
                                <Button onClick={() => { setCodeOpened((prevState) => !prevState) }} variant={ codeOpened ? 'outlined' : 'contained' } >{ codeOpened ? <CodeOff/> : <Code/> }</Button>
                            </Tooltip>
                        ) }
                        <Tooltip title={"Leave from Meeting"}>
                            <Button onClick={() => { dispatch(leaveMeeting()) }} variant='contained' color="error" sx={{ aspectRatio: '1/1' }}><CallEnd/></Button>
                        </Tooltip>
                        { user.id === meetingInfo?.hoster.id && (
                            <>
                            <Tooltip title="End the Meeting">
                                <Button onClick={() => { setEndMeetingConfirm(true) }} variant='contained' startIcon={ <PhoneDisabled/> } >End</Button>
                            </Tooltip>
                            <Dialog
                                open={endMeetingConfirm}
                                onClose={() => { setEndMeetingConfirm(false) }}
                            >
                                <DialogTitle>Are you sure you want to end?</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to end the meeting? This will disconnect every user and delete the meeting.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => { setEndMeetingConfirm(false) }}>No</Button>
                                    <Button onClick={() => { dispatch(endMeeting({ link })) }}>Yes</Button>
                                </DialogActions>
                            </Dialog>
                            </>
                        )}
                    </Stack>
                </Stack>
                <div style={{
                    display: 'grid',
                    gap: '1rem',
                    width: '100%',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                }}>
                    {
                        remoteVideos.ids.map((id) => 
                            Object.keys(remoteVideos.videos[id]).map( (streamId, index) => {
                                const stream = remoteVideos.videos[id][streamId]
                                if (streamId !== 'screen')
                                    return ( <Video srcObject={stream} muted={id === 'local'} noflip={stream.id === remoteVideos.screenShare.streamId} key={index}/>)
                                else
                                    return null
                            })
                        )
                    }
                </div>
            </Stack>
        </Stack>
    )
}

const DeviceSelect = ({ width, size, label, value, onChange, options, disabled }) => {
    return (
        <FormControl sx={{ width }} size={size ? size : "small"} disabled={disabled}>
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