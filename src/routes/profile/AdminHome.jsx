import { AddBoxOutlined, ManageAccountsOutlined, Report, VideoChatRounded } from "@mui/icons-material"
import { Grid, Stack, Typography } from "@mui/material"
import { RouterLink } from "components/RouterLink"
import SmallPanel from "components/SmallPanel"
import { SelectableCard } from "components/cards/SelectableCard"
import { JobCreatorHomeCards } from "./job_creator/JobCreatorHome/JobCreatorHomeCards"

export const AdminHome = () => {

    return (
        <Stack direction = {'column'}>
            <Stack>
                <SmallPanel
                    mainTitle = {'Actions'}
                    noElevation
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                >
                        <Grid container spacing={2} justifyContent={'center'}>
                            <Grid item xs={4}>
                                <RouterLink to={"/questionaries"}>
                                    <SelectableCard>
                                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                            <AddBoxOutlined sx = {{height:'30px' , width:'30px'}}/>
                                            <Typography fontSize={17} fontWeight={650} letterSpacing={1}>Questionaries</Typography>
                                        </Stack>
                                    </SelectableCard>
                                </RouterLink>
                            </Grid>
                            <Grid item xs={4}>
                                <RouterLink to={"/reports"}>
                                    <SelectableCard>
                                        <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                            <Report sx = {{height:'30px' , width:'30px'}}/>
                                            <Typography fontSize={17} fontWeight={650} letterSpacing={1}>Reports</Typography>
                                        </Stack>
                                    </SelectableCard>
                                </RouterLink>
                            </Grid>
                        </Grid>
                </SmallPanel> 
            </Stack>
        </Stack>
        
  )
}