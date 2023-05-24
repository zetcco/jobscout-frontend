import {Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { RouterLink } from '../RouterLink'
import { useFetch } from 'hooks/useFetch'

function BlogPostSummary({id, userId,name, src,timestamp,content, initUpvoteCount, initIsUpvoted}) {

  const fetch = useFetch()

  const [ upvoteCount, setUpvoteCount ] = useState(initUpvoteCount)
  const [ isUpvoted, setIsUpvoted ] = useState(initIsUpvoted)

  const toggleUpvote = (id) => {
    fetch(`/posts/upvote/${id}`, "PATCH", { errorMsg: "Error performing action", onSuccess: () => {
      setUpvoteCount(x => isUpvoted ? --x : ++x)
      setIsUpvoted(x => !x)
    } })
  }

  return (
    <>
        <BasicCard>
         <Stack spacing = {2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <RouterLink to={`/users/${userId}`}>
                            <ProfileHeaderCard name = {name} src={src} />
                        </RouterLink>
                        <Typography>•</Typography>
                        <Typography> {new Date(timestamp).toDateString()}   </Typography>
                </Stack>
            </Stack>
            <Stack alignItems={'flex-start'}>
               <Typography>
                    {content}          
               </Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <RouterLink  to={"/blog/post/" + id}>
                <Button>
                  view more
                </Button>
              </RouterLink>
            </Stack>
            <Stack justifyContent={'right'} direction={'row'} alignItems={'center'} spacing={2}>
              <Button onClick={() => { toggleUpvote(id) }} startIcon={<ThumbUpOffAltIcon/>} variant={isUpvoted ? 'contained' : 'text'}>{isUpvoted ? 'Unvote' : 'Upvote'}</Button>
              <Typography>{upvoteCount}</Typography>
            </Stack>
        </Stack>
        </BasicCard>
    </>
  )
}

export default BlogPostSummary
