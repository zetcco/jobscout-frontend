import {Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import axios from 'axios'


function BlogPostContent({userProfileName,blogContent,timeStamp}) {
  const [blogPostContent,setBlogPostContent] = useState();
  const [profileName,setProfileName] = useState();

  const authToken = useSelector(selectAuthUserToken);

  console.log(authToken);

  const loadPage = async () => {
    const response = await axios.get(
      '/posts?pageno=1&size=10',
      { headers : {
          Authorization : `Bearer ${authToken}`
      }}
    );
      setBlogPostContent(response.data);
      console.log(response.data)
  }
  
  return (
    <BasicCard>
      <stack spacing = {5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <ProfileHeaderCard name={userProfileName} /> 
                        <tr>{timeStamp}</tr>
                </Stack>
                <MoreVertIcon />
            </Stack>
            <Stack alignItems={'flex-start'}>
               <Typography>
                  {blogContent}

               </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <ThumbUpOffAltIcon />
                        <ModeCommentOutlinedIcon />
                </Stack>
                <BookmarkBorderOutlinedIcon />
            </Stack>
        </stack>
    </BasicCard>
  )
}

export default BlogPostContent
