import React from "react";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import { useState ,useEffect} from "react";

export const Status = ({status , dueDate}) => {
    const [days , setDays] = useState(null);
    useEffect(() =>{
        const remDays = Math.round(((new Date(dueDate) - new Date())/ (1000 * 3600 * 24)));
        if(remDays >= 0){
            setDays(remDays);
        }else{
            setDays("Expired!");
        }
    } , [])
    
    
    return ( 
        
            <Stack direction={'column'} spacing={3}>
                <Stack direction={'row'} justifyContent='space-between'>                   
                    <Box>
                        <Typography>Number of applicants</Typography>
                    </Box>
                    <Box>
                    <Chip label="21" variant="outlined" color='primary'/>
                    </Box>
                </Stack>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Box>
                        <Typography>Closing date</Typography>
                    </Box>
                    <Box>
                        <Chip label={days} variant="outlined" color='error'/>
                    </Box>
                </Stack>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Box>
                        <Typography>Status</Typography>
                    </Box>
                    <Box>
                        {
                            status && status === "STATUS_ACTIVE" && <Chip label="Activated" variant="outlined" color='success'/>
                        }
                        {
                            status && status === 'STATUS_HOLD' && <Chip label='Hold' color="warning" variant="outlined" />
                        }
                        {
                            status && status === 'STATUS_OVER' && <Chip label='Deactived' color="error" variant="outlined" />
                        }
                    </Box>
                </Stack>
            </Stack>
              
     );
}