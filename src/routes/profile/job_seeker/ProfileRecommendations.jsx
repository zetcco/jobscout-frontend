import { RemoveCircleOutline } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { RouterLink } from 'components/RouterLink'
import { ProfileSmallWithName } from 'components/profile/ProfileSmallWithName'
import { selectAuthUserId } from 'features/authSlice'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ProfileRecommendations = () => {

    const [ recommendations, setRecommendations ] = useState([])
    const { userId } = useParams()
    const authUserId = useSelector(selectAuthUserId)
    const [ deleteRecommendationConfirm, setDeleteRecommendationConfirm ] = useState({ show: false, id: null })
    const fetch = useFetch()

    useEffect(() => {
        fetch(`/job-seeker/${userId}/recommendations`, "GET", { onSuccess: (data) => { setRecommendations(data) } })
    }, [userId])

    const deleteRecommendation = (id) => {
        fetch(
            `/recommendations/delete?type=recommendation&requester=${userId}&recommendation=${id}`,
            "DELETE",
            { 
                successMsg: "Recommendation deleted",
                errorMsg: "Failed to delete",
                onSuccess: () => {
                    setRecommendations(e => e.filter(rec => rec.id !== id))
                    setDeleteRecommendationConfirm({ show: false, id: null })
                }
            }
        )
    }

    return (
        <Box>
        {recommendations.length === 0 ? (
            <Typography>No recommendations yet..</Typography>
        ) : (
            <Stack spacing={4}>
            {   recommendations.map((recommendation, index) => (
                    <Stack key={index}>
                        <RouterLink to={`/users/${recommendation.responder.id}`} key={index}>
                            <ProfileSmallWithName name={recommendation.responder.displayName} avatar={recommendation.responder.displayPicture}/>
                        </RouterLink>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography fontSize={18} fontWeight={700}>{recommendation.content}</Typography>
                            { recommendation.responder.id === authUserId && <IconButton color='error' onClick={() => { setDeleteRecommendationConfirm({ show: true, id: recommendation.id }) }}><RemoveCircleOutline/></IconButton> }
                        </Stack>
                    </Stack>
            ))}
            <Dialog
                open={deleteRecommendationConfirm.show}
                onClose={() => { setDeleteRecommendationConfirm({ show: false, id: null }) }}
            >
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the recommendation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDeleteRecommendationConfirm({ show: false, id: null }) }}>No</Button>
                    <Button onClick={() => { deleteRecommendation(deleteRecommendationConfirm.id) }}>Yes</Button>
                </DialogActions>
            </Dialog>
            </Stack>
        )}
        </Box>
    )
    
}
