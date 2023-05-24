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

  useEffect( () => {
    fetch(`/posts?pageno=0&size=10`, "GET", { onSuccess: (data) => { 
      setViewBlogPosts(data)
      console.log(data)
    }})
  }, [] );

  return (
    <>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
          <Stack width={'100%'} justifyContent={'center'}>
            <Button startIcon={<AddCircleOutline/>} onClick={() => { navigate('/blog/add') }}>Create Post</Button>
          </Stack>
          <Stack spacing={3} width={'100%'}>
            {
              viewBlogPosts.length === 0 ? (
                <Typography>No posts found</Typography>
              ) : (
                viewBlogPosts.map( (blogPost, index) => (
                  <BlogPostSummary key={index} userId={blogPost.user.id} src={blogPost.user.displayPicture} id ={blogPost.id} initUpvoteCount={blogPost.upvoteCount} initIsUpvoted={blogPost.isUpvoted} name={blogPost.user.displayName} timestamp={blogPost.timeStamp} content={blogPost.content}/>
                ) )
              )
            }
          </Stack>          
        </Stack>
    </>
  )
}
export default Blog