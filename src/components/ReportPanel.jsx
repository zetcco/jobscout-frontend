import { ContentCopyRounded, OpenInNew } from "@mui/icons-material";
import { Alert, AlertTitle, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import SmallPanel from "components/SmallPanel";
import { useFetch } from "hooks/useFetch";
import React, { forwardRef, useState } from "react";

export const ReportPanel = forwardRef(({ type, onClose, id }, ref) => {
    const [ reason, setReason ] = useState("")
    const [ otherReason, setOtherReason ] = useState('')
    const [ showOtherReason, setShowOtherReason ] = useState(false);
    const fetch = useFetch()

    const submitReport = () => {
        fetch('/report/add', "POST", { data: { type, message: reason.id !== 0 ? reason.reason : otherReason, contentId: id }, onSuccess: () => { onClose() }, successMsg: "Meeting created", errorMsg: "Failed to create meeting", successMsg: "Reported Successfully", errorMsg: "Report failed" })
    }

    return (
        <Box sx={{ width: { xs: '90%', sm: '75%', md: '50%' } }}>
        <SmallPanel mainTitle={"File a Report"} glassEffect={false} transparentBackground={false}>
            <Stack spacing={2}>
                <Typography variant="body1">Please select the most relevant reason for the report from the dropdown menu below, If your report falls under a category not listed below or requires further explanation, please provide additional details in the text field after selecting "Other" on the dropdown menu.</Typography>
                <FormControl fullWidth>
                    <InputLabel>Select Reason</InputLabel>
                    <Select
                        value={reason}
                        label="Select Reason"
                        onChange={(e) => { 
                            setReason(e.target.value) 
                            if (e.target.value.id === 0)
                                setShowOtherReason(true)
                            else
                                setShowOtherReason(false)
                        }}
                    >
                        { reasons.map(reason =>  <MenuItem value={reason} key={reason.id}>{reason.title}</MenuItem>) }
                    </Select>
                </FormControl>
                {
                    showOtherReason && (
                        <TextField value={otherReason} onChange={(e) => { setOtherReason(e.target.value) }} rows={6} multiline/>
                    )
                }
                <Stack spacing={2} direction={'row'} width={'100%'}>
                    <Button variant="outlined" fullWidth onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={submitReport} fullWidth disabled={reason === "" || (reason?.id === 0 && otherReason === "")}>Submit</Button>
                </Stack>
            </Stack>
        </SmallPanel>
        </Box>
    );
});

const reasons = [
    { id: 1, title: "In-Appropiate Content", reason: "Inappropiate content" },
    { id: 2, title: "User Guideline Violation", reason: "Violates user guidelines" },
    { id: 3, title: "Copyrights", reason: "Stolen content" },
    { id: 0, title: "Other", reason: "" }
]