import {Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { RouterLink } from '../RouterLink'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import { useParams } from 'react-router-dom'
 

function BlogPostSummary({id,name,timestamp,content}) {
  const [blogPostContent,setBlogPostContent] = useState();
  const authToken = useSelector(selectAuthUserToken);
  console.log(timestamp)

  const loadPage = async () => {
    const response = await axios.get(
      '/posts?pageno=1&size=2',
      { headers : {
          Authorization : `Bearer ${authToken}`
      }}
    );
      setBlogPostContent(response.data);
  }

  return (
    <>
        <BasicCard>
         <Stack spacing = {2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <ProfileHeaderCard name={name} /> 
                        <Typography> {timestamp}   </Typography>
                </Stack>
                <MoreVertIcon />
            </Stack>
            <Stack alignItems={'flex-start'}>
               <Typography>
                    {content}          
               </Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
               <RouterLink  to={"/blog/post/" + id}>view more</RouterLink>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <ThumbUpOffAltIcon />
                        <ModeCommentOutlinedIcon />
                </Stack>
                <BookmarkBorderOutlinedIcon />
            </Stack>
        </Stack>
        </BasicCard>
    </>
  )
}

export default BlogPostSummary
