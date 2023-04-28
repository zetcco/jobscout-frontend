import { Button, Grid, Stack, TextField } from '@mui/material'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthUserToken } from 'features/authSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBlogPostForm = () => {
  const navigate = useNavigate()

  const { postId } = useParams();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const authToken = useSelector(selectAuthUserToken)
  const [content,setContent] = useState("");
  const {loading,setLoading} = useState(false);

  const onSubmit = async(e) => {
    setLoading(true);
    const data = { content, date };
    
    try {
      const response = await axios.post('/posts/add', 
        data,
        { headers: { Authorization: `Bearer ${authToken}` }}
      );
      	console.log(response.data)
      if (response.status === 200) {
        alert('Data saved successfully');
        navigate(`post/${response.data.id}`)
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save data');
    }
    setLoading(false);
};


  return (
    <div>
      <Stack>
        <CenteredHeaderCard
          title={'Create Blog Post'}
          footer={
            <Stack direction={'row'} spacing={2} md={6}>
              <Button variant='outlined' fullWidth>
                Cancel
              </Button>
              <Button disabled={content === '' || loading} onClick={onSubmit} variant='contained' fullWidth >
                Submit
              </Button>
            </Stack>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {/* <TextField
                id='outlined-basic'
                label='Blog Post Title'
                placeholder='Enter the Blog Post Title'
                variant='outlined'
                fullWidth
              /> */}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id='outlined-multiline-static'
                label='Content'
                placeholder='Enter the content of the Blog Post'
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          </Grid>
        </CenteredHeaderCard>
      </Stack>
    </div>
  ) 
}       

export default CreateBlogPostForm
            