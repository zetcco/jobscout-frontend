import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Chip from '@mui/material/Chip';

export const Status = () => {
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
                        <Chip label="2 days remaining" variant="outlined" color='error'/>
                    </Box>
                </Stack>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Box>
                        <Typography>Status</Typography>
                    </Box>
                    <Box>
                        <Chip label="Opened" variant="outlined" color='success'/>
                    </Box>
                </Stack>
            </Stack>
              
     );
}