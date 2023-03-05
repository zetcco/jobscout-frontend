import { ContentCopyRounded, OpenInNew } from "@mui/icons-material";
import { Alert, AlertTitle, Autocomplete, Avatar, Box, Button, Chip, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import SmallPanel from "components/SmallPanel";
import { selectAuthUserToken } from "features/authSlice";
import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { debounce } from "lodash";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

export const NewChat = forwardRef(({ onClose }) => {
    const [ response, setResponse ] = useState(null)

    const [error, setError] = useState(null);
    const [ loading, setLoading ] = useState(false)

    const [ email, setEmail ] = useState('')
    const [ emailLoading, setEmailLoading ] = useState(false);
    const [ popupOpen, setPopupOpen ] = useState(false)
    const [ options, setOptions ] = useState([])
    const [ selectedParticipants, setSelectedParticipants ] = useState([])

    const authToken = useSelector(selectAuthUserToken);

    const debouceEmailCheck = useCallback(
        debounce(async (email, selectedParticipants) => {
            if (!selectedParticipants.find(participant => participant.email === email)) {
                try { 
                    const response = await axios.get(`/user/email/${email}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                    setPopupOpen(true)
                    setOptions([ response.data ])
                } catch (error) {
                    setOptions([])
                }
            }
            setEmailLoading(false)
        }, [1000]), 
    []);

    const onEmailType = (value) => {
        setEmail(value)
        setEmailLoading(true)
        debouceEmailCheck(value, selectedParticipants)
    }

    const onDelete = (index) => {
        setSelectedParticipants((prevState) => prevState.splice(index, 1))
    }

    const onSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios.post('/messaging/create', { 
                ids: selectedParticipants.map((participant) => participant.id)
             }, {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            setResponse(response.data.name === null ? selectedParticipants[0].displayName : response.data.name)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    
    useEffect(() => {
        if (email === '')
            setEmailLoading(false)
    }, [email])

    return (
        <SmallPanel mainTitle={response ? "Chat created! Yay!" : "Create a new chat"} sx={{ width: '40%' }}>
            {loading ? (
                <Typography>Loading</Typography>
            ) : (
                    response ? (
                        <>
                            <TextField value={response}/>
                        </>
                    ) : (
                        <>
                        { error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>{error.response.message}</strong>
                            </Alert>
                        )}
                        <Stack spacing={2}>
                            <Autocomplete
                            value={null}
                            inputValue={email}
                            onChange={(e, value) => { 
                                setSelectedParticipants([...selectedParticipants, value])
                                setEmail('') 
                                setPopupOpen(false)
                            }}
                            onInputChange={(e, value) => { onEmailType(value) }}
                            filterOptions={(x) => x}
                            options={options}
                            open={popupOpen}
                            getOptionLabel={(option) => typeof option === 'string' ? option : option.displayName }
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            freeSolo
                            renderInput={(params) => 
                                <TextField 
                                {...params}
                                label="Enter participant emails"
                                InputProps={{ 
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            { emailLoading ? <CircularProgress size={20}/> : <SearchIcon /> }
                                            {params.InputProps.endAdornment}
                                        </InputAdornment>
                                    ),
                                 }}
                                />
                            }
                            renderOption={(props, option) => {
                                return (
                                    <li {...props}>
                                    <Stack direction={"row"} spacing={1}>
                                        <Avatar src={option.displayPicture} alt={option.displayName} sx={{ width: 24, height: 24 }}/>
                                        <Typography>{option.displayName}</Typography>
                                    </Stack>
                                    </li>
                                )
                            }}
                            />
                            <Stack direction={"row"} flexWrap='wrap'>
                                {
                                    selectedParticipants.map((participant, index) => ( 
                                        <Chip 
                                            onDelete={() => onDelete(index)}
                                            label={participant.displayName}
                                            key={index}
                                            sx={{ m: 0.5 }}
                                            avatar={ <Avatar src={participant.displayPicture} alt={participant.displayName} sx={{ width: 24, height: 24 }}/> }
                                            />
                                     ))
                                }
                            </Stack>
                            <Stack direction={"row"} spacing={2}>
                                <Button variant="outlined" onClick={onClose} fullWidth>Cancel</Button>
                                <Button variant="contained" onClick={onSubmit} fullWidth disabled={selectedParticipants.length === 0}>Start Now</Button>
                            </Stack>
                        </Stack>
                        </>
                    )
            )}
        </SmallPanel>
    );
});

