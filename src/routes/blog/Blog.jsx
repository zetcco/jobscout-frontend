import { Stack } from "@mui/system"
import {Button } from '@mui/material'
import BlogPostSummary from "../../components/blog/BlogPostSummary"
import SmallPanel from "../../components/SmallPanel"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUserToken } from "features/authSlice";
import axios from "axios";

function Blog() {
  const [viewBlogPost,setViewBlogPost] = useState(null);
  const [viewBlogPosts,setViewBlogPosts] = useState([]);

  const authToken = useSelector(selectAuthUserToken);

  console.log(authToken);

  useEffect( () => {
    
    loadPage()
  }, [] );

  const loadPage = async () => {
    const response = await axios.get(
      '/posts?page=0&size=2',
      { headers : {
          Authorization : `Bearer ${authToken}`
      }}
    );
      setViewBlogPosts(response.data);
  }

  return (
    <>
        <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
            
          <Stack spacing={3}>
            {
              viewBlogPosts.map( (blogPost, index) => (
                <BlogPostSummary name={blogPost.user.displayName} timestamp={blogPost.timestamp} content={blogPost.content}/>
              ) )
            }
          </Stack>
          
        </Stack>
    </>
  )
}
export default Blog