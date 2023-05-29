import React, { useState } from "react";
import { Box, Button, IconButton, Modal, Popover, Stack, Step, StepLabel, Stepper, Typography} from '@mui/material'
import Chip from '@mui/material/Chip';
import { BasicCard } from "../cards/BasicCard";
import { MoreVertTwoTone, Report } from "@mui/icons-material";
import { ReportPanel } from "components/ReportPanel";
import { useSelector } from "react-redux";
import { selectAuthUserId } from "features/authSlice";



const SingleJobPost = ({ sx ,title , children , id, type  , skills , status, summary, questionaryId, applicationStatus, applicantCount, urgent }) => {
    const [ reportModal, setReportModal ] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const authUserId = useSelector(selectAuthUserId)

    console.log(applicationStatus)

    return (
            <BasicCard sx={{ 
                ...sx ,
                ...(summary && ({"&:hover": {
                    backgroundColor: (theme) => theme.palette.grey[100],
                }}))
            }}>
            <Stack direction={'column'} spacing={4}>
                <Stack
                    direction='column'
                    justifyContent='space-between'
                    spacing={2}
                >
                    <Stack spacing = {2}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                                <Typography variant={'h5'} align= 'left'>{ title }</Typography>
                                {
                                    authUserId !== id && (
                                    <>
                                        <IconButton onClick={(e) => { setAnchorEl(e.target) }}>
                                            <MoreVertTwoTone/>
                                        </IconButton>
                                        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                                            <Stack p={2} direction={'column'} spacing={1}>
                                                <Button startIcon={<Report/>} onClick={() => { setReportModal(true) }}>Report</Button>
                                                <Modal
                                                    open={reportModal}
                                                    onClose={() => setReportModal(false)}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <ReportPanel type={'REPORT_JOB_POST'} onClose={() => { setReportModal(false) }} id={id}/>
                                                </Modal>
                                            </Stack>
                                        </Popover>
                                    </>
                                    )
                                }
                                </Stack>
                        </Stack>
                    </Stack>
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                sx={{
                                }}
                            >
                            </Box>
                            <Typography sx={{whiteSpace: "pre-wrap", ...( summary && {maxHeight: 200, overflow: 'hidden', textOverflow: 'ellipsis'})}}> { children } </Typography>
                        </Box>
                </Stack>

                <Stack direction={{sm:'row', xs: 'column'}} spacing={{ xs: 1, sm: 0 }} justifyContent='space-between'>
                    <Stack direction='row' spacing={1}>
                        {
                            skills.map(skill => <Chip label={skill.name} key={skill.id} variant="outlined" color="success"/>)
                        }
                    </Stack>
                    <Stack align="right" direction = {'row'} spacing = {1}>
                        {
                            type && type === 'TYPE_PERMANENT' && <Chip label='Full Time' color="info" variant="outlined" />
                        } 
                        {
                            type && type === 'TYPE_PART_TIME' && <Chip label='Part Time' color="warning" variant="outlined" />
                        }
                        {
                            type && type === 'TYPE_FREELANCE' && <Chip label='Freelance' color="error" variant="outlined" />
                        }
                        {
                            status && status === "STATUS_ACTIVE" && <Chip label="Activated" variant="outlined" color='success'/>
                        }
                        {
                            status && status === 'STATUS_HOLD' && <Chip label='Hold' color="warning" variant="outlined" />
                        }
                        {
                            status && status === 'STATUS_OVER' && <Chip label='Deactived' color="error" variant="outlined" />
                        }
                        {
                            questionaryId &&  <Chip label='Screening Test' color="warning" variant="outlined"/>
                        }
                        {
                            urgent && <Chip label='Urgent' color="error" variant="contained" />
                        }
                    </Stack>
                </Stack>
                {
                    applicationStatus && (
                        <>
                        <Stepper activeStep={applicationSteps.find(obj => obj.enum.includes(applicationStatus)).step}>
                            {
                                applicationSteps.map((obj, index) => {
                                    const labelProps = {};
                                    let label = obj.label
                                    if (applicationStatus === "REJECTED" && obj.enum.includes("REJECTED")) {
                                        label = "Rejected"
                                        labelProps.optional = (
                                            <Typography variant="caption" color="error">
                                                Alert message
                                            </Typography>
                                        );
                                        labelProps.error = true;
                                    } 
                                    return (
                                        <Step key={obj.step}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    )
                                })
                            }
                        </Stepper>
                        { applicationStatus === "INTERVIEW_SELECTED" && <Chip label="Called for Interview" variant="contained" color='warning' sx={{ color: 'white' }}/> }
                        { applicationStatus === "ACCEPTED" && <Chip label="Accepted" variant="contained" color='success' sx={{ color: 'white' }}/> }
                        { applicationStatus === "REJECTED" && <Chip label="Rejected" variant="contained" color='error'/> }
                        { applicationStatus === "APPLIED" && <Chip label="Not Decided" variant="contained" color='info'/> }
                        { applicantCount > 0 && <Chip label={applicantCount} variant="contained" color="info"/> }
                        </>
                    )
                }
            </Stack>
            </BasicCard>     
     );
}

SingleJobPost.defaultProps = {
    skills: [],
    summary: false
}

const applicationSteps = [
    { label: "Applied", enum: ["APPLIED"], step: 0 },
    { label: "Accepted", enum: ["ACCEPTED", "REJECTED"], step: 1 }, 
    { label: "Interview", enum: ["INTERVIEW_SELECTED"], step: 2}, 
    { label: "Completed", enum: ["COMPLETED"], step: 3}
]

export default SingleJobPost;