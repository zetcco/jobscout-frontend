import { ContentCopyRounded, OpenInNew } from "@mui/icons-material";
import { Alert, AlertTitle, Box, Button, Divider, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import SmallPanel from "components/SmallPanel";
import { selectAuthUserToken } from "features/authSlice";
import { useFetch } from "hooks/useFetch";
import { forEach } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ScheduleMeeting = () => {
    const [ timestamp, setTimestamp ] = useState(getDateWithAddition(1));
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const fetch = useFetch()

    const hostMeeting = async () => {
        setLoading(true)
        await fetch('/meeting/host', "POST", { data: { timestamp }, successMsg: "Meeting created", errorMsg: "Failed to create meeting", onSuccess: (data) => {
            setResponse(process.env.REACT_APP_FRONTEND_URL + "/meet/" + data.link)
        }, onError: (error) => {
            setError(error)
        }})
        setLoading(false)
    }

    return (
        <Box sx={{ width: '50%' }}>
        <SmallPanel mainTitle={response ? "Here's your link" : "Schedule a Meeting"}>
            {loading ? (
                <Typography>Loading</Typography>
            ) : (
                    response ? (
                        <Stack spacing={2}>
                        <Typography variant="body2">Copy this link and send it to people you want to meet with. Be sure to save it so you can use it later, too.</Typography>
                        <TextField
                            value={response}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => {navigator.clipboard.writeText(response)}}>
                                            <ContentCopyRounded/>
                                        </IconButton>
                                        <IconButton onClick={() => {window.open(response)}}>
                                            <OpenInNew/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                readOnly: true,
                                style: { fontSize: 15 }
                            }}
                        />
                        </Stack>
                    ) : (
                        <Stack spacing={2}>
                        { error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>{error.response.data.message}</strong>
                            </Alert>
                        )}
                        <Typography variant="body2">Set the expiration date for the meeting below.</Typography>
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                type="date"
                                value={timestamp.toLocaleDateString('en-CA')}
                                onChange={(e) => { setTimestamp(new Date( e.target.value )) }}
                                sx={{ width: '100%' }}
                                inputProps={{
                                    min: (getDateWithAddition(1).toLocaleDateString('en-CA'))
                                }}
                            />
                            <TextField label="Day(s)" type={'number'} value={Math.ceil((timestamp - new Date())/(1000 * 60 * 60 * 24))} onChange={e => { 
                                setTimestamp(getDateWithAddition(parseInt(e.target.value))) 
                            }} inputProps={{
                                min: 1
                            }}/>
                        </Stack>
                        <Button variant="contained" onClick={hostMeeting}>Schedule Now</Button>
                        </Stack>
                    )
            )}
        </SmallPanel>
        </Box>
    );
};

const getDateWithAddition = (count) => {
    let dateTomorrow = new Date()
    let dateToday = new Date()
    dateTomorrow.setDate(dateToday.getDate() + count)
    return dateTomorrow
}