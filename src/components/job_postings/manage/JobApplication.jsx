import React from 'react'
import { BasicCard } from '../../cards/BasicCard'
import ProfileHeaderCard from '../../profile/ProfileHeaderCard'
import { Typography , Button } from '@mui/material'
import { Box, Stack } from '@mui/material'

export const JobApplication = () => {
  return (
    <BasicCard>
      <Stack  
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}>
        <Box>
          <ProfileHeaderCard name={'Rokcy Bhai'} />
            <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, asperiores reprehenderit hic praesentium vel earum laboriosam beatae pariatur quas vero eaque blanditiis officia voluptate soluta assumenda voluptatibus necessitatibus, ad laborum.
            </Typography>
        </Box> 
        <Box>
          <Stack 
          direction="row"
          spacing={2}>
              <Button variant="outlined">ACCEPT</Button>
              <Button variant="outlined">REJECT</Button>
           </Stack>
        </Box>
               
            
      </Stack>
    </BasicCard>
  )
}
