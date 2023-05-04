import { useState , useEffect } from "react";
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { Stack, Box } from "@mui/system";
import { Button } from "@mui/material";
import SmallPanel from "../../components/SmallPanel";
import { Status } from "../../components/job_postings/post/Status";
import { Ownership } from "../../components/job_postings/post/Ownership";
import { serverClient } from "features/authSlice";
import { useParams } from "react-router-dom";


export const JobPost = () => {
  
// Get the :postId param from the URL.
const { postId }  = useParams();
const [jobPost , setjobPost] = useState('');
const [disable , setDisable] = useState(false);
useEffect(()=>{
    const fetchJobPost = async () => {
        try{
            const response = await serverClient.get(`/jobpost/jobPostId?val=${postId}`)
            console.log(response.data);
            setjobPost(response.data)
        }catch(error) {
            console.log(error);
        }
    }
    fetchJobPost()
} , [])



    return ( 
        <Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
                        <Box> 
                            <SingleJobPost
                                title = { jobPost.title }
                                type = { jobPost.type }
                            >{ jobPost.description }
                            </SingleJobPost> 
                        </Box>
                        <Stack direction={{ xs: "column", sm: "row" }} alignItems="stretch" justifyContent={"space-between"} spacing={2}>
                            <SmallPanel 
                                mainTitle={'Ownership'} 
                                children={<Ownership 
                                                createdBy={jobPost.jobCreator?.displayName} 
                                                ownedBy={jobPost.organization?.displayName}
                                                />}
                                sx={{ flexGrow: 1 }} />
                            <SmallPanel 
                                mainTitle={'Status'} 
                                children={<Status 
                                                status = { jobPost.status }
                                                dueDate = { jobPost.dueDate }
                                                setDisable = { setDisable } 
                                                />} 
                                sx={{ flexGrow: 2 }} />
                        </Stack>
                        <Button variant="contained" color='success' fullWidth size='large' disabled = {disable}>Apply now</Button>
            </Stack>                   
        </Box>
     );
}
 