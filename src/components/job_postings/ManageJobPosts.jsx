import { CircularProgress, Stack, Typography } from '@mui/material'
import { selectAuthUser, selectAuthUserId } from 'features/authSlice'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleJobPost from './SingleJobPost'
import { RouterLink } from 'components/RouterLink'

export const ManageJobPosts = () => {

    const [ jobPosts, setJobPosts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const fetch = useFetch()
    const authUserId = useSelector(selectAuthUserId)
    const authUser = useSelector(selectAuthUser)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await fetch(`/jobpost/search?${ authUser.role === "ROLE_JOB_CREATOR" ? "jobcreator" : "organization" }=${authUserId}`, "GET", { onSuccess: setJobPosts })
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading)
        return <CircularProgress/>

    return ( 
        <Stack spacing={4}>
        <Typography variant='h4'>Manage Job Posts</Typography>
        <Stack spacing={2}>
        { 
            jobPosts.length === 0 ? (
                <Typography>You have not posted anything</Typography>
            ) : (
                jobPosts.map( jobPost => 
                <RouterLink to={`/posts/${jobPost.id}`} key={jobPost.id}>
                    <SingleJobPost 
                        applicantCount = {jobPost.applicationCount}
                        summary={true}
                        title = { jobPost.title }
                        type = { jobPost.type }
                        status = {jobPost.status}
                        questionaryId={ jobPost.questionaryId }
                    >
                        { jobPost.description }
                    </SingleJobPost>
                </RouterLink>
            )
        ) }
        </Stack>
        </Stack>
    )
}
