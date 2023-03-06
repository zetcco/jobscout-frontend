import { Alert, AlertTitle, Autocomplete, Avatar, Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import SmallPanel from "components/SmallPanel";
import { selectAuthUserToken } from "features/authSlice";
import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { debounce } from "lodash";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { UploadArea } from "components/input/UploadArea";
import { Controller, useForm } from "react-hook-form";

export const NewChat = forwardRef(({ onClose }) => {
    const [ response, setResponse ] = useState(null)

    const [error, setError] = useState(null);
    const [ loading, setLoading ] = useState(false)

    const [ email, setEmail ] = useState('')
    const [ responseLoading, setResponseLoading ] = useState(false);
    const [ popupOpen, setPopupOpen ] = useState(false)
    const [ options, setOptions ] = useState([])
    const [ selectedParticipants, setSelectedParticipants ] = useState([])

    const [ newChatName, setNewChatName ] = useState('')

    const { register, control, handleSubmit, watch }= useForm();

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
            setResponseLoading(false)
        }, [1000]), 
    []);

    const onEmailType = (value) => {
        setEmail(value)
        setResponseLoading(true)
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
            setResponse(response.data)
            setNewChatName(response.data.name ? response.data.name : response.data.participants[0].displayName)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    
    const onChatUpdateSubmit = async (data) =>{
        setLoading(true)
        try { 
            var formData = new FormData()
            formData.append('name', data.chatname);
            formData.append('picture', data.file[0]);
            await axios.post(`/messaging/conversation/${response.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            setLoading(false)
            onClose()
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (email === '')
            setResponseLoading(false)
    }, [email])

    return (
        <SmallPanel mainTitle={response ? "Chat created! Yay!" : "Create a new chat"} sx={{ width: { xs: '80%', md: '40%' } }}>
            <Stack spacing={2}>
            { error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.response.data.message}</strong>
                </Alert>
            )}
            {(
                    response ? (
                        <form onSubmit={handleSubmit(onChatUpdateSubmit)} encType="multipart/form-data">
                            <Stack spacing={2}>
                                <Typography variant="body2">You can change the Chat name and the Chat picture too !</Typography>
                                <Controller
                                    name="chatname"
                                    control={control}
                                    defaultValue={newChatName}
                                    render={ ({ field }) => (
                                        <TextField 
                                            {...field}
                                            label="Chat name" 
                                            variant="outlined"
                                            fullWidth 
                                        />               
                                    )}
                                />
                                <UploadArea 
                                    register={
                                        register(
                                            "file"
                                        )} 
                                    text={"Click here to upload Chat Picture"}
                                    files={watch("file")}
                                />
                                <Stack direction={"row"} spacing={2}>
                                    <Button fullWidth onClick={onClose}>Close</Button>
                                    <Button type="submit" variant="contained" fullWidth disabled={loading}>Save</Button>
                                </Stack>
                            </Stack>
                        </form>
                    ) : (
                        <>
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
                                            { responseLoading ? <CircularProgress size={20}/> : <SearchIcon /> }
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
                                <Button variant="contained" onClick={onSubmit} fullWidth disabled={selectedParticipants.length === 0 || loading}>Start Now</Button>
                            </Stack>
                        </>
                    )
            )}
            </Stack>
        </SmallPanel>
    );
});

