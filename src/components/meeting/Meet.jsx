import { AddIcCall, CallEnd, PhoneDisabled } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { selectAuthUser } from "features/authSlice";
import { fetchMediaDevices, fetchMeeting, selectMeetingError, selectMeetingInfo, selectMeetingLoading, selectMeetingLocalStreams, selectMeetingMediaDevices, selectMeetingRemoteVideos, setLocalStream } from 'features/meetSlice'
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
    const localStream = useSelector(selectMeetingLocalStreams)
    const error = useSelector(selectMeetingError)
    const loading = useSelector(selectMeetingLoading)

    useEffect(() => {
        dispatch(fetchMeeting({ link }))
        dispatch(fetchMediaDevices())
    }, [dispatch, link])

    if (error?.status === 404)
        navigate('/home')

    return (
        <Stack alignItems="center" direction="column" spacing={2}>
            <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="video-selector-label">Select Video</InputLabel>
                    <Select label="Select Video" labelId="video-selector-label" value={localStream.video} onChange={ (e) => { dispatch(setLocalStream({ video: e.target.value })) }}>
                        {
                            mediaDevices.videoDevices?.ids.map((deviceId, index) => (
                                <MenuItem key={index} value={mediaDevices.videoDevices.devices[deviceId]}>{mediaDevices.videoDevices.devices[deviceId].label}</MenuItem>
                            ))
                        } 
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="audio-selector-label">Select Audio</InputLabel>
                    <Select label="Select Audio" labelId="audio-selector-label" value={localStream.audio} onChange={ (e) => { dispatch(setLocalStream({ audio: e.target.value })) }}>
                        {
                            mediaDevices.audioDevices?.ids.map((deviceId, index) => (
                                <MenuItem key={index} value={mediaDevices.audioDevices.devices[deviceId]}>{mediaDevices.audioDevices.devices[deviceId].label}</MenuItem>
                            ))
                        } 
                    </Select>
                </FormControl>
                <Button onClick={() => {}} variant='contained' disabled={meetingInfo === null} startIcon={ <AddIcCall/> }>Join</Button>
                <Button onClick={() => {}} variant='contained' disabled={remoteVideos.length === 0} startIcon={ <CallEnd/> } >Disconnect</Button>
                { user.id === meetingInfo?.hoster.id && (<Button onClick={() => {}} variant='contained' disabled={remoteVideos.length === 0} startIcon={ <PhoneDisabled/> } >End</Button>) }
            </Stack>
        </Stack>
    )
}
