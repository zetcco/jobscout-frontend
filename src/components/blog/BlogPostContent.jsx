import {Button, IconButton, Modal, Popover, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSelector } from 'react-redux'
import { selectAuthUserId } from 'features/authSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'hooks/useFetch'
import { DeleteOutline, Edit, Report } from '@mui/icons-material'
import { RouterLink } from 'components/RouterLink'
import { ReportPanel } from 'components/ReportPanel'


function BlogPostContent() {
  const [blogPost,setBlogPost] = useState(null);
  const fetch = useFetch()
  const authUserId = useSelector(selectAuthUserId)
  const [ reportModal, setReportModal ] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
                    <IconButton onClick={(e) => { setAnchorEl(e.target) }}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                      <Stack p={2} direction={'column'} spacing={1}>
                      {
                        authUserId === blogPost?.user.id ? (
                        <>
                          <Button startIcon={<Edit/>} onClick={() => { navigate(`/blog/edit/${blogPost?.id}`) }}>Edit</Button>
                          <Button startIcon={<DeleteOutline/>} color='error' onClick={onDelete}>Delete</Button>
                        </>
                        ) : (
                          <>
                          <Button startIcon={<Report/>} onClick={() => { setReportModal(true) }}>Report</Button>
                          <Modal
                              open={reportModal}
                              onClose={() => setReportModal(false)}
                              sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                              }}
                          >
                              <ReportPanel type={'REPORT_BLOG_POST'} onClose={() => { setReportModal(false) }} id={postId}/>
                          </Modal>
                          </>
                        )
                      }
                      </Stack>
                    </Popover>
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
