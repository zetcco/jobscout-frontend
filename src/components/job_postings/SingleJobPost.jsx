import React from "react";
import { Stack, Typography} from '@mui/material'
import Chip from '@mui/material/Chip';
import { BasicCard } from "../BasicCard";


const SingleJobPost = () => {

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
    return (
            <BasicCard>
                <Stack
                    width={'100%'}
                    direction='column'
                    justifyContent='space-between'
                    spacing={5}
                >
                    <Stack>
                        <Typography variant={'h5'} align= 'left'>React Developer</Typography>
                        <Typography>
                            Check your proxy settings or contact your network administrator to make sure the proxy server is working. If you don't believe you should be using a proxy server: Go to the Main menu  Settings  Change Proxy Settings LAN Settings and deselect "Use a proxy server for your LAN".
                        </Typography>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='row' spacing={2}>
                            <Chip label="React" variant="outlined" color="success" onDelete={handleDelete}/>
                            <Chip label="Boostrap" variant="outlined" color="success" onDelete={handleDelete}/>
                        </Stack>
                        <Stack align="right">
                            <Chip label="Freelancer" color="info" variant="outlined" />
                        </Stack>
                    </Stack>
                </Stack>
                
            </BasicCard>     
     );
}
 
export default SingleJobPost;