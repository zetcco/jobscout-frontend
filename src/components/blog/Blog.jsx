import { Stack } from "@mui/system"
import BlogPostSummary from "./BlogPostSummary"
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
      '/posts?pageno=0&size=2',
      { headers : {
          Authorization : `Bearer ${authToken}`
      }}
    );
    console.log(response)
      setViewBlogPosts(response.data);
  }

  return (
    <>
        <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
            
          <Stack spacing={3}>
            {
              viewBlogPosts.map( (blogPost, index) => (
                <BlogPostSummary id ={blogPost.id} name={blogPost.user.displayName} timestamp={blogPost.timeStamp} content={blogPost.content}/>
              ) )
            }
          </Stack>          
        </Stack>
    </>
  )
}
export default Blog