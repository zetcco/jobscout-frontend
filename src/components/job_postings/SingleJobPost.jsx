import React from "react";
import { Box, Stack, Typography} from '@mui/material'
import Chip from '@mui/material/Chip';
import { BasicCard } from "../cards/BasicCard";



const SingleJobPost = ({ sx ,title , children , type  , skills , status, summary, questionaryId, applicationStatus }) => {
    return (
            <BasicCard sx={{ 
                ...sx ,
                ...(summary && ({"&:hover": {
                    backgroundColor: (theme) => theme.palette.grey[100],
                }}))
            }}>
                <Stack
                    direction='column'
                    justifyContent='space-between'
                    spacing={2}
                >
                    <Stack spacing = {2}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography variant={'h5'} align= 'left'>{ title }</Typography>
                            { applicationStatus === "INTERVIEW_SELECTED" && <Chip label="Accepted" variant="contained" color='success' sx={{ color: 'white' }}/> }
                            { applicationStatus === "REJECTED" && <Chip label="Rejected" variant="contained" color='error'/> }
                            { applicationStatus === "APPLIED" && <Chip label="Not Decided" variant="contained" color='info'/> }
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
                        </Stack>
                    </Stack>
                </Stack>
                
            </BasicCard>     
     );
}

SingleJobPost.defaultProps = {
    skills: [],
    summary: false
}

export default SingleJobPost;