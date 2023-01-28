import { Button, Chip, TextField } from "@mui/material"
import { Stack } from "@mui/system"
import React from "react"
import { CenteredHeaderCard } from "../../../cards/CenteredHeaderCard"
import { RouterLink } from "../../../RouterLink"

export const AddSkillsForm =() =>{
    return(
        <CenteredHeaderCard 
            title={"Add your Skills"}
            footer={
                <RouterLink to={"/signup/user/seeker/profile/qualification"}>
                    <Button variant='contained' sx={{ width: '100%' }}>Continue</Button>
                </RouterLink>
            }
        >
             <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField id="outlined-basic" label="Select your Field" variant="outlined" />   
                <TextField id="outlined-basic" label="Select yor Skills" variant="outlined" />
                <Stack direction="row" spacing={1}>
                    <Chip label="React" color="primary" variant="outlined" />
                    <Chip label="Sql" color="primary" variant="outlined" />
                    <Chip label="Python" color="primary" variant="outlined" />
                </Stack>
            </Stack>
           

        </CenteredHeaderCard>
    )
}