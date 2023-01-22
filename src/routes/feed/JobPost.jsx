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
                        <Box>
                            <SingleJobPost/>
                        </Box>
                        <Stack direction={{ xs: "column", sm: "row" }} alignItems="stretch" justifyContent={"space-between"} spacing={2}>
                            <SmallPanel
                                mainTitle={'Ownership'}
                                children={<Ownership/>}
                                sx={{ flexGrow: 1 }}
                            />
                            <SmallPanel
                                mainTitle={'Status'}
                                children={<Status/>}
                                sx={{ flexGrow: 2 }}
                            />
                        </Stack>
                        <Button variant="contained" color='success' fullWidth size='large'>Apply now</Button>
            </Stack>                   
        </BasicCard>
     );
}
 