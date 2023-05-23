import { useState , useEffect } from "react";
import SingleJobPost from "../../components/job_postings/SingleJobPost";
import { Stack, Box } from "@mui/system";
import { Alert, AlertTitle, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import SmallPanel from "../../components/SmallPanel";
import { Ownership } from "../../components/job_postings/post/Ownership";
import { selectAuthUser, serverClient } from "features/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProfileWithHeader from "components/profile/ProfileWithHeader";
import { RouterLink } from "components/RouterLink";
import { useSelector } from "react-redux";
import { useFetch } from "hooks/useFetch";
import { Edit, ManageAccounts } from "@mui/icons-material";


export const JobPost = () => {
  
    // Get the :postId param from the URL.
    const { postId }  = useParams();
    const [jobPost , setjobPost] = useState('');
    const [ loading, setLoading ] = useState(true)
    const [ applied, setApplied ] = useState(false)
    const [ error, setError ] = useState(null)
    const authUser = useSelector(selectAuthUser)
    const navigate = useNavigate()
    const fetch = useFetch()

    const handleApply = () => {
        if (jobPost.questionaryId) {
            navigate(`/questionaries/${jobPost.questionaryId}?jobpost=${jobPost.id}`)
        } else {
            fetch(`/jobpost/${postId}/apply`, "PATCH", { successMsg: "Successfully applied", onSuccess: () => { setApplied(true) } })
        }
    }

    const setJobPostStatus = (value) => {
        fetch(`/jobpost/${postId}/set-status`, "PATCH", { data: { status: value }, successMsg: "Changed successfully", onSuccess: () => {
            setjobPost(post => ({ ...post, status: value }))
        } })
    }

    useEffect(()=>{
        const fetchJobPost = async () => {
            try{
                setLoading(true)
                const response = await serverClient.get(`/jobpost/${postId}`)
                if (authUser.role === "ROLE_JOB_SEEKER") 
                    setApplied((await serverClient.get(`/jobpost/check-application?jobPostId=${postId}`)).data)
                setjobPost(response.data)
            }catch(error) {
                setError(error.response.data);
            }
            setLoading(false)
        }
        fetchJobPost()
    } , [])

    if (error)
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography>{error.message}</Typography>
            </Alert>
        )


    return ( 
        <Box>
            {
            loading ? (
                <Stack width={'100%'} justifyContent={'center'}>
                    <CircularProgress sx={{ m: 'auto' }}/>
                </Stack>
            ) : (
            <Stack spacing={2} sx={{ width: '100%' }} mb={2}>
                        {
                            authUser.role === "ROLE_JOB_CREATOR" && (
                                <Stack direction={'row'} spacing={1} justifyContent={'right'}>
                                    <FormControl
                                    sx={{ width: { xs: 300, sm: 250 } }}
                                    >
                                    <InputLabel>Set Status</InputLabel>
                                    <Select label="Set Status" value={jobPost.status} onChange={e => { setJobPostStatus(e.target.value) }}>  
                                        <MenuItem value = {"STATUS_HOLD"}>On Hold</MenuItem> 
                                        <MenuItem value = {"STATUS_ACTIVE"}>Active</MenuItem> 
                                        <MenuItem value = {"STATUS_OVER"}>Over</MenuItem> 
                                    </Select>
                                    </FormControl>
                                    <Button startIcon={<ManageAccounts/>} onClick={() => { navigate(`/posts/${jobPost.id}/manage`) }} variant="contained">Applicants</Button>
                                </Stack>
                            )
                        }
                        <Box> 
                            <SingleJobPost
                                skills={ jobPost.skillList }
                                status={ jobPost.status }
                                title = { jobPost.title }
                                type = { jobPost.type }
                                questionaryId={ jobPost.questionaryId }
                            >{ jobPost.description }
                            </SingleJobPost> 
                        </Box>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <SmallPanel 
                                mainTitle={'Ownership'} 
                                divsx={{ flexGrow: 1}}>
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
                            <SmallPanel mainTitle={'Status'} divsx={{ flexGrow: 2 }} >
                                <Stack direction={'column'} spacing={3}>
                                    <Stack direction={'row'} justifyContent='space-between'>                   
                                        <Box>
                                            <Typography>Number of applicants</Typography>
                                        </Box>
                                        <Box>
                                        <Chip label={jobPost.applicationCount} variant="outlined" color='primary'/>
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
                                        <Typography>Status</Typography>
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
                        {
                            authUser.role === 'ROLE_JOB_SEEKER' && (
                                <Button variant="contained" color='success' fullWidth size='large' disabled = {new Date(jobPost.dueDate) < new Date() || applied} onClick={handleApply}>{ applied ? 'Already Applied' : 'Apply Now' }</Button>
                            )
                        }
            </Stack>                   
                )
            }
        </Box>
     );
}
 