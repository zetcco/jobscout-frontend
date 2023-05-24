import {Box, Button, IconButton, Popover, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useSelector } from 'react-redux'
import { selectAuthUserId, selectAuthUserToken } from 'features/authSlice'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'hooks/useFetch'
import { EditIcon } from 'routes/profile/EditIcon'
import { DeleteOutline } from '@mui/icons-material'
import ProfileWithHeader from 'components/profile/ProfileWithHeader'
import { RouterLink } from 'components/RouterLink'


function BlogPostContent() {
  const [blogPost,setBlogPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const fetch = useFetch()
  const authUserId = useSelector(selectAuthUserId)

  const {postId} = useParams();
  
  const navigate = useNavigate()
  
    useEffect(()=>{
      fetch(`/posts/${postId}`, "GET", { onSuccess: setBlogPost })
    },[])

  const toggleUpvote = () => {
    fetch(`/posts/upvote/${postId}`, "PATCH", { errorMsg: "Error performing action", onSuccess: () => {
      setBlogPost(x => x.isUpvoted ? {...x, upvoteCount: x.upvoteCount - 1} : {...x, upvoteCount: x.upvoteCount + 1})
      setBlogPost(x => ({...x, isUpvoted: !x.isUpvoted}))
    } })
  }

  const onDelete = () => {
    fetch(`/posts/${blogPost.id}`, "DELETE", { successMsg: "Post deleted successfully", errorMsg: "Error performing action", onSuccess: () => {
      navigate(`/blog`)
    } })
  }

  return (
        <BasicCard>
         <Stack spacing = {2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <RouterLink to={`/users/${blogPost?.user.id}`}>
                            <ProfileHeaderCard name = {blogPost?.user.displayName} src={blogPost?.user.displayPicture} />
                        </RouterLink>
                        <Typography>•</Typography>
                        <Typography> {new Date(blogPost?.timeStamp).toDateString()}   </Typography>
                </Stack>
                {
                  authUserId === blogPost?.user.id && (
                    <>
                    <IconButton onClick={(e) => { setAnchorEl(e.target) }}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                      <Stack p={2} direction={'column'} spacing={1}>
                        <Button startIcon={<EditIcon/>} onClick={() => { navigate(`/blog/edit/${blogPost?.id}`) }}>Edit</Button>
                        <Button startIcon={<DeleteOutline/>} color='error' onClick={onDelete}>Delete</Button>
                      </Stack>
                    </Popover>
                    </>
                  )
                }
            </Stack>
            <Stack alignItems={'flex-start'}>
               <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                    {blogPost?.content}          
               </Typography>
            </Stack>

            <Stack justifyContent={'right'} direction={'row'} alignItems={'center'} spacing={2}>
              <Button onClick={toggleUpvote} startIcon={<ThumbUpOffAltIcon/>} variant={blogPost?.isUpvoted ? 'contained' : 'text'}>{blogPost?.isUpvoted ? 'Unvote' : 'Upvote'}</Button>
              <Typography>{blogPost?.upvoteCount}</Typography>
            </Stack>
        </Stack>
        </BasicCard>
  )
}

export default BlogPostContent
