import {Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useSelector } from 'react-redux'
import { selectAuthUserToken } from 'features/authSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function BlogPostContent({name,timestamp,content}) {
  const [blogPost,setBlogPost] = useState(null);
  const [blogContent,setBlogContent] = useState(null);
  const authToken = useSelector(selectAuthUserToken);

  console.log(authToken);

  const {postId} = useParams();

  const loadPage = async () => {
    const response = await axios.get(
      '/posts/' + postId,
      { headers : {
          Authorization : `Bearer ${authToken}`
      }}
    );
      setBlogPost(response.data);
      setBlogContent(response.data);
      console.log(response.data)
  }
  
    useEffect(()=>{
    loadPage()
    },[])


  return (
    <>
            <BasicCard>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                              <ProfileHeaderCard name={blogPost?.user.displayName} /> 
                              <tr>{timestamp}</tr>
                      </Stack>
                      <MoreVertIcon />
                  </Stack>
                  <Stack alignItems={'flex-start'}>
                    <Typography>
                        {blogPost?.content}
                    </Typography>
                  </Stack>
    
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                              <ThumbUpOffAltIcon />
                              <ModeCommentOutlinedIcon />
                      </Stack>
                      <BookmarkBorderOutlinedIcon />
                  </Stack>
          </BasicCard>
    </>
  )
}

export default BlogPostContent
