import { Stack } from "@mui/system"
import BlogPostSummary from "./BlogPostSummary"
import { useEffect, useState } from "react";
import { useFetch } from "hooks/useFetch";
import { Box, Button, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router";

function Blog() {
  const [viewBlogPosts,setViewBlogPosts] = useState([]);
  const fetch = useFetch()
  const navigate = useNavigate()
  const [ sortTime, setSortTime ] = useState('month')

  useEffect( () => {
    fetch(`/posts?trend=${sortTime}`, "GET", { onSuccess: (data) => { 
      setViewBlogPosts(data)
    }})
  }, [] );

  const fetchData = async (val) => {
    setSortTime(val)
    await fetch(`/posts?trend=${val}`, "GET", { onSuccess: (data) => { 
      setViewBlogPosts(data)
    }})
  }

  return (
    <>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2} width={'100%'}>
          <Stack justifyContent={'space-between'} direction={'row'} width={'100%'}>
            <Button startIcon={<AddCircleOutline/>} onClick={() => { navigate('/blog/add') }} variant="contained">Create Post</Button>
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              <Typography mr={1}>View Posts from </Typography>
              <Button variant={ sortTime === 'day' ? 'contained' : 'outlined' } onClick={() => { fetchData('day') }}>Today</Button>
              <Button variant={ sortTime === 'week' ? 'contained' : 'outlined' } onClick={() => { fetchData('week') }}>This Week</Button>
              <Button variant={ sortTime === 'month' ? 'contained' : 'outlined' } onClick={() => { fetchData('month') }}>This Month</Button>
            </Stack>
          </Stack>
          <Stack spacing={3} width={'100%'}>
            {
              viewBlogPosts.length === 0 ? (
                <Typography>No posts found</Typography>
              ) : (
                viewBlogPosts.map( blogPost => (
                  <BlogPostSummary 
                    key={blogPost.id}
                    userId={blogPost.user.id}
                    src={blogPost.user.displayPicture}
                    id ={blogPost.id}
                    initUpvoteCount={blogPost.upvoteCount}
                    initIsUpvoted={blogPost.isUpvoted}
                    name={blogPost.user.displayName}
                    timestamp={blogPost.timeStamp}
                    content={blogPost.content}
                  />
                ) )
              )
            }
          </Stack>          
        </Stack>
    </>
  )
}
export default Blog