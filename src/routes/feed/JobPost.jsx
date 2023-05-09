import { useState , useEffect } from "react";
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { Stack, Box } from "@mui/system";
import { Button, Chip, CircularProgress, Typography } from "@mui/material";
import SmallPanel from "../../components/SmallPanel";
import { Ownership } from "../../components/job_postings/post/Ownership";
import { serverClient } from "features/authSlice";
import { useParams } from "react-router-dom";
import ProfileWithHeader from "components/profile/ProfileWithHeader";
import { RouterLink } from "components/RouterLink";


export const JobPost = () => {
  
    // Get the :postId param from the URL.
    const { postId }  = useParams();
    const [jobPost , setjobPost] = useState('');
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        const fetchJobPost = async () => {
            try{
                setLoading(true)
                const response = await serverClient.get(`/jobpost/${postId}`)
                console.log(response.data);
                setjobPost(response.data)
            }catch(error) {
                console.log(error);
            }
            setLoading(false)
        }
        fetchJobPost()
    } , [])


    return ( 
        <Box>
            {
            loading ? <CircularProgress/> : (
            <Stack spacing={2} sx={{ width: '100%' }} mb={2}>
                        <Box> 
                            <SingleJobPost
                                skills={ jobPost.skillList }
                                status={ jobPost.status }
                                title = { jobPost.title }
                                type = { jobPost.type }
                            >{ jobPost.description }
                            </SingleJobPost> 
                        </Box>
                        <Stack direction={{ xs: "column", sm: "row" }} alignItems="stretch" justifyContent={"space-between"} spacing={2}>
                            <SmallPanel 
                                mainTitle={'Ownership'} 
                                sx={{ flexGrow: 1 }}>
                                <Stack spacing={2} direction={'column'}>
                                    <RouterLink to={`/users/${jobPost.jobCreator.id}`}>
                                        <ProfileWithHeader title = 'Posted by' name = {jobPost.jobCreator.displayName} src={jobPost.jobCreator.displayPicture} />
                                    </RouterLink>
                                    {jobPost.organization && (
                                    <RouterLink to={`/users/${jobPost.organization.id}`}>
                                        <ProfileWithHeader title = 'Owned By'  name = {jobPost.organization.displayName} src={jobPost.organization.displayPicture} />
                                    </RouterLink>)}
                                </Stack> 
                                </SmallPanel>
                            <SmallPanel mainTitle={'Status'} sx={{ flexGrow: 2 }} >
                                <Stack direction={'column'} spacing={3}>
                                    <Stack direction={'row'} justifyContent='space-between'>                   
                                        <Box>
                                            <Typography>Number of applicants</Typography>
                                        </Box>
                                        <Box>
                                        <Chip label="21" variant="outlined" color='primary'/>
                                        </Box>
                                    </Stack>
                                    <Stack direction={'row'} justifyContent='space-between'>
                                        <Typography>Closing date</Typography>
                                        {
                                            new Date(jobPost.dueDate) > new Date() ? (
                                                <Typography fontWeight={700} fontSize={15}>{new Date(jobPost.dueDate).toDateString()}</Typography>
                                            ) : (
                                                <Chip label={'Expired'} variant="outlined" color='error'/>
                                            )
                                        }
                                    </Stack>
                                    <Stack direction={'row'} justifyContent='space-between'>
                                        <Box>
                                            <Typography>Status</Typography>
                                        </Box>
                                        <Box>
                                            {
                                                jobPost.status === "STATUS_ACTIVE" && <Chip label="Activated" variant="outlined" color='success'/>
                                            }
                                            {
                                                jobPost.status === 'STATUS_HOLD' && <Chip label='Hold' color="warning" variant="outlined" />
                                            }
                                            {
                                                jobPost.status === 'STATUS_OVER' && <Chip label='Deactived' color="error" variant="outlined" />
                                            }
                                        </Box>
                                    </Stack>
                                </Stack>
                            </SmallPanel>
                        </Stack>
                        <Button variant="contained" color='success' fullWidth size='large' disabled = {new Date(jobPost.dueDate) < new Date()}>Apply now</Button>
            </Stack>                   
                )
            }
        </Box>
     );
}
 