import {Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { RouterLink } from '../RouterLink'

function BlogPostSummary() {
  return (
    <>
        <BasicCard>
         <Stack spacing = {2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                        <ProfileHeaderCard name={'Indrajith Madhumal'} /> 
                        <tr>18:00 - Dec 28</tr>
                </Stack>
                <MoreVertIcon />
            </Stack>
            <Stack alignItems={'flex-start'}>
               <Typography>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
               </Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
               <RouterLink  to={"/blog/1"}> view more</RouterLink>
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
