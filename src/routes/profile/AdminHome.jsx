import { AddBoxOutlined, ManageAccountsOutlined, VideoChatRounded } from "@mui/icons-material"
import { Grid, Modal, Stack, Typography } from "@mui/material"
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
                        <Grid container spacing={2}>
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
                            <RouterLink to={"/posts/1/manage"}>
                            <SelectableCard>
                                <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                    <ManageAccountsOutlined sx = {{height:'30px' , width:'30px'}}/>
                                    <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MANAGE</Typography>
                                </Stack> 
                            </SelectableCard>
                            </RouterLink>
                            </Grid>
                            <Grid item xs={4}>
                            <SelectableCard onClick={() => {}}>
                                    <Stack direction = {'column'} alignItems = {'center'} justifyContent = {'center'} spacing = {1}>
                                        <VideoChatRounded sx={{ height: 30, width: 30 }}/>
                                        <Typography fontSize={17} fontWeight={650} letterSpacing={1}>MEET</Typography>
                                    </Stack> 
                                </SelectableCard>
                            </Grid>
                        </Grid>
                </SmallPanel> 
            </Stack>
            
            <SmallPanel
                mainTitle={"Stats"}
                noElevation
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            >
            <Stack direction = {'row'} spacing = {2}>
                <Grid container spacing={2} sx = {{alignItems:'stretch'}}>
                    <Grid item xs = {12} md = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'POSTS'}
                                subtitle = {'No of job posts'}
                                count = {6}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'ACTIVATED POSTS'}
                                subtitle = {'No of activated posts'}
                                count = {10}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Stack flexGrow={1}>
                            <JobCreatorHomeCards
                                title = {'DEACTIVATED POSTS'}
                                subtitle = {'No of deactivated posts'}
                                count = {2}
                            />
                        </Stack>
                    </Grid>
                </Grid>           
            </Stack>
            </SmallPanel>

        </Stack>
        
  )
}