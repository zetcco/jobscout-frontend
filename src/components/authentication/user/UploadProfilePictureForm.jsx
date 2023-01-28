import { Button, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import { CenteredHeaderCard } from "../../cards/CenteredHeaderCard"
import { DashedArea } from "../../input/DashedArea"
import UploadIcon from '@mui/icons-material/Upload';


export const UploadProfilePictureForm = () => {
    return (
      <CenteredHeaderCard
          title={"Create your Profile"} 
          footer={<Button variant='contained' sx={{ width: '100%' }}>Continue</Button>}
          icon={<Typography></Typography>}
      >
          <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField id="outlined-basic" label="Add your organization" variant="outlined" />
          
            <DashedArea text={"Click to Upload Profile Picture"} icon={<UploadIcon />} >
              <UploadIcon/>
            </DashedArea>
          </Stack>
           
          
      </CenteredHeaderCard>
    )
  }