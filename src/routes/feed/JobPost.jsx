import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { Stack, Box } from "@mui/system";
import { Button } from "@mui/material";
import SmallPanel from "../../components/SmallPanel";
import { Status } from "../../components/job_postings/post/Status";
import { Ownership } from "../../components/job_postings/post/Ownership";
import { BasicCard } from "../../components/cards/BasicCard";


export const JobPost = () => {
    return ( 
        <Stack spacing={3} sx={{ width: '100%' }}>
            <Box> <SingleJobPost/> </Box>
            <Stack direction={{ xs: "column", sm: "row" }} alignItems="stretch" justifyContent={"space-between"} spacing={3}>
                <SmallPanel mainTitle={'Ownership'} children={<Ownership/>} sx={{ flexGrow: 1 }} />
                <SmallPanel mainTitle={'Status'} children={<Status/>} sx={{ flexGrow: 2 }} />
            </Stack>
            <Button variant="contained" color='success' fullWidth size='large'>Apply now</Button>
        </Stack>                   
     );
}
 