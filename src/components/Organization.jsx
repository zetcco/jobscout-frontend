import React from "react"



export const Organization = () => {
    return (
      <CenteredHeaderCard
          title={"Register to JobScout"} 
          footer={<Button sx={{ width: '100%' }}>Register</Button>}
          icon={<Typography></Typography>}
      >
          <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
          <Box width={'100%'} height={25} sx={{ backgroundColor: '#f00' }}>
          </Box>
      </CenteredHeaderCard>
    )
  }