import { Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { RouterLink } from 'components/RouterLink'
import { BasicCard } from 'components/cards/BasicCard'
import ProfileHeaderCard from 'components/profile/ProfileHeaderCard'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Reports = () => {

    const [ loading, setLoading ] = useState(false)
    const [ reports, setReports ] = useState([])
    const fetch = useFetch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await fetch('/report', "GET", { onSuccess: setReports })
            setLoading(false)
        }
        fetchData()
    }, [])

    const onDelete = async (id) => {
        fetch(`/report/delete/${id}`, "DELETE", { successMsg: "Report Deleted", onSuccess: () => {
            setReports(ex => ex.filter(e => e.id !== id))
        } })
    }

    return (
        <Stack direction={'column'} justifyContent={'center'}>
        {
            loading ? (
                <CircularProgress/>
            ) : (
                <Stack direction={'column'} spacing={3}>
                <Typography variant='h4'>Reports</Typography>
                <Grid container spacing={2}>
                    {
                        reports.map(report => {
                            const [ link, chip ] = getType(report.type)
                            return (
                            <Grid item xs={12} md={6}>
                            <BasicCard key={report.id}>
                                <Stack direction={'column'} spacing={2}>
                                    <Stack direction={'column'} spacing={2}>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography>Reported By</Typography>
                                            <RouterLink to={`/users/${report.user.id}`}>
                                                <ProfileHeaderCard name = {report.user.displayName} src={report.user.displayPicture} />
                                            </RouterLink>
                                        </Stack>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography>Report Type</Typography>
                                            <Typography>{ chip }</Typography>
                                        </Stack>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography>Report Message</Typography>
                                            <Typography>{report.message}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography>Reported At</Typography>
                                            <Typography>{ new Date(report.timeStamp).toLocaleDateString() + " • " + new Date(report.timeStamp).toLocaleTimeString() }</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={2} direction={'row'} justifyContent={'right'}>
                                        <Button color='error' onClick={() => { onDelete(report.id) }}>Delete</Button>
                                        <Button onClick={() => { navigate(`${link}/${report.contentId}`) }}>View Source</Button>
                                    </Stack>
                                </Stack>
                            </BasicCard>
                            </Grid>
                    ) })
                    }
                </Grid>
                </Stack>
            )
        }
        </Stack>
    )
}

const getType = (type) => {
    switch (type) {
        case "REPORT_BLOG_POST":
            return [ "/blog/post", <Chip label={"Blog Post"} variant='contained' color='warning'/> ]
        case "REPORT_USER":
            return [ "/users", <Chip label={"User"} variant='contained' color='error'/> ]
        case "REPORT_JOB_POST":
            return [ "/posts", <Chip label={"Job Post"} variant='contained' color='info'/> ]
        case "REPORT_RECOMMENDATION":
            return [ "", <Chip label={"Recommendation"} variant='contained'/> ]
    }
}
