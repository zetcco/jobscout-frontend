import { Box, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'
import SmallPanel from '../SmallPanel'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { RouteOutlined, Router, RouteRounded } from '@mui/icons-material'
import { RouterLink } from '../RouterLink'

function BlogPostSummary() {
  return (
    <>
        <BasicCard>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                 <div>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <ProfileHeaderCard name={'Indrajith Madhumal'} /> 
                        <tr>18:00 - Dec 28</tr>
                    </Stack>
                </div>
                <MoreVertIcon />
            </Stack>
            <Stack alignItems={'flex-start'}>
               <Typography>
                Test
               </Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
               <RouterLink> view more</RouterLink>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <div>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <ThumbUpOffAltIcon />
                        <ModeCommentOutlinedIcon />
                    </Stack>
                </div>
                <BookmarkBorderOutlinedIcon />
            </Stack>
        </BasicCard>
    </>
  )
}

export default BlogPostSummary
