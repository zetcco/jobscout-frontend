import { Box, Button, Stack, Typography } from "@mui/material"
import React from "react"
import { CenteredHeaderCard } from "../../cards/CenteredHeaderCard"
import { DashedArea } from "../../input/DashedArea"
import UploadIcon from '@mui/icons-material/Upload';
import { RouterLink } from "../../RouterLink";


export const UploadProfilePictureForm = () => {
    return (
      <CenteredHeaderCard
          title={"Create your Profile"} 
          footer={
            <Stack direction={"row"} spacing={2}>
              <Box sx={{ width: '100%' }}>
                <RouterLink to="/home">
                  <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                </RouterLink>
              </Box>
              <Button variant='contained' sx={{ width: '100%' }} disabled>Continue</Button>
            </Stack>
          }
          icon={<Typography></Typography>}
      >
          <Stack spacing={2} sx={{ width: '100%' }}>
            <DashedArea text={"Click to Upload Profile Picture"} icon={<UploadIcon />} >
              <UploadIcon/>
            </DashedArea>
          </Stack>
           
          
      </CenteredHeaderCard>
    )
  }