import { Box, Stack, Typography } from '@mui/material'
import { RouterLink } from 'components/RouterLink'
import SingleJobPost from 'components/job_postings/SingleJobPost'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'

export const JobApplications = () => {

    const [ applications, setApplications ] = useState([])

    const fetch = useFetch()

    useEffect(() => {
      fetch(`/jobpost/applications/me`, "GET", { onSuccess: setApplications })
    }, [])

    return (
        <Stack spacing={4}>
            <Typography variant='h4'>Job Applications</Typography>
            <Stack spacing={2}>
            {
                applications.length === 0 ? (
                    <Typography>You have not applied to anything</Typography>
                ) : (
                    applications.map(application => (
                        <RouterLink to={`/posts/${application.jobPost.id}`} key={application.jobPost.id}>
                            <SingleJobPost 
                            applicationStatus={application.status}
                            summary={true}
                            title = { application.jobPost.title }
                            type = { application.jobPost.type }
                            status = {application.jobPost.status}
                            questionaryId={ application.jobPost.questionaryId }
                            >
                                { application.jobPost.description }
                            </SingleJobPost>
                        </RouterLink>
                    ))
                )
            }
            </Stack>
        </Stack>
    )
}
