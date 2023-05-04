import React from "react";
import { Stack, Typography} from '@mui/material'
import Chip from '@mui/material/Chip';
import { BasicCard } from "../cards/BasicCard";



const SingleJobPost = ({ sx ,title , children , type  , skills , status}) => {

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
    return (
            <BasicCard sx={{ 
                ...sx,
             }}>
                <Stack
                    direction='column'
                    justifyContent='space-between'
                    spacing={5}
                >
                    <Stack spacing = {2}>
                        {

                        }
                        <Typography variant={'h5'} align= 'left'>{ title }</Typography>
                        <Typography>
                            { children }
                        </Typography>
                    </Stack>

                    <Stack direction={{sm:'row', xs: 'column'}} spacing={{ xs: 2, md: 0 }} justifyContent='space-between'>
                        <Stack direction='row' spacing={1}>
                            {skills && <Chip label="React" variant="outlined" color="success" onDelete={handleDelete}/>}
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
                        </Stack>
                    </Stack>
                </Stack>
                
            </BasicCard>     
     );
}
 
export default SingleJobPost;