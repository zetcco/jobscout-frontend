import { ContentCopyRounded, OpenInNew } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import SmallPanel from "components/SmallPanel";
import { selectAuthUserToken } from "features/authSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ScheduleMeeting = () => {
    const [ timestamp, setTimestamp ] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const authToken = useSelector(selectAuthUserToken);

    const hostMeeting = async () => {
        setLoading(true)
        try {
            const response = await axios.post('/meeting/host', { timestamp }, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            setResponse(process.env.REACT_APP_FRONTEND_URL + "/meet/" + response.data.link)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return (
        <SmallPanel mainTitle={response ? "Here's your link" : "Schedule a Meeting"} sx={{ width: '40%' }}>
            {loading ? (
                <Typography>Loading</Typography>
            ) : (
                    response ? (
                        <>
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
                        </>
                    ) : (
                        <>
                        { error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>{error.response.message}</strong>
                            </Alert>
                        )}
                        <TextField
                            label="Enter a Schedule"
                            type="date"
                            placeholder="Enter your Date of Birth"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <Divider>
                            <Typography align="center" variant="overline" fullWidth>
                                OR
                            </Typography>
                        </Divider>
                        <Button variant="contained" onClick={hostMeeting}>Schedule Now</Button>
                        </>
                    )
            )}
        </SmallPanel>
    );
};
