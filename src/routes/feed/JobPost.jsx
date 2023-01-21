import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { Stack } from "@mui/system";
import { Grid ,Button} from "@mui/material";
import SmallPanel from "../../components/SmallPanel";
import { Status } from "../../components/job_postings/post/Status";
import { Ownership } from "../../components/job_postings/post/Ownership";
import { BasicCard } from "../../components/BasicCard";


export const JobPost = () => {
    return ( 
        <BasicCard>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Grid container xs = {12} spacing = {4}>
                        <Grid item xs = {12}>
                            <SingleJobPost/>
                        </Grid>
                        <Grid item xs = {5}>
                            <SmallPanel
                                mainTitle={'Ownership'}
                                children={<Ownership/>}
                            />
                        </Grid>
                        <Grid item xs = {7}>
                            <SmallPanel
                                mainTitle={'Status'}
                                children={<Status/>}
                            />
                        </Grid>
                        <Grid item xs = {9}>
                        </Grid>
                        <Grid item xs = {3}>
                            <Button variant="contained" color='success' fullWidth size='large'>Apply now</Button>
                        </Grid>
                </Grid>
            </Stack>                   
        </BasicCard>
     );
}
 