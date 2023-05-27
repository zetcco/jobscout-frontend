import { Stack, Typography } from '@mui/material'
import { RouterLink } from 'components/RouterLink'
import SmallPanel from 'components/SmallPanel'
import SingleJobPost from 'components/job_postings/SingleJobPost'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ProfilePosts = () => {

    const { userId } = useParams()
    const [ posts, setPosts ] = useState([])
    const fetch = useFetch()

    useEffect(() => {
        fetch(`/jobpost/search?jobcreator=${userId}`, "GET", { onSuccess: setPosts })
    }, [])

    return (
        <SmallPanel mainTitle={'Posts'} noElevation padding={{ xs: 1 }} >
            {
                posts.length === 0 ? (
                    <Typography>No posts</Typography>
                ) : (
                    <Stack spacing={2}>
                    {
                    posts.map(jobPost => (
                        <RouterLink to={`/posts/${jobPost.id}`} key={jobPost.id}>
                            <SingleJobPost 
                            summary={true}
                            title = { jobPost.title }
                            type = { jobPost.type }
                            status = {jobPost.status}
                            questionaryId={ jobPost.questionaryId }
                            >
                                { jobPost.description }
                            </SingleJobPost>
                        </RouterLink>
                    ))}
                    </Stack>
                )
            }
        </SmallPanel>
    )
}
