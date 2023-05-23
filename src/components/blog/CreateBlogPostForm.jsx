import { Button, Grid, Stack, TextField } from '@mui/material'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';

const CreateBlogPostForm = ({ initContent }) => {
  const navigate = useNavigate()
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [content,setContent] = useState(initContent ? initContent.content : null);
  const [loading,setLoading] = useState(false);
  const fetch = useFetch()

  console.log(initContent)

  const onSubmit = async (e) => {
    setLoading(true);
    const data = { ...initContent, content, date };
    if (initContent) {
      await fetch('/posts/update', "PUT", { data: data, successMsg: "Post updated succesfully", onSuccess: (data) => {
        navigate(`/blog/post/${data.id}`)
      } })
    } else {
      await fetch('/posts/add', "POST", { data: data, successMsg: "Post added succesfully", onSuccess: (data) => {
        navigate(`/blog/post/${data.id}`)
      } })
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
                { initContent ? "Update" : "Submit" }
              </Button>
            </Stack>
          }
        >
          <Grid container>
            <Grid item xs={12} md={12}>
              <TextField
                id='outlined-multiline-static'
                label='Content'
                placeholder='Enter the content of the Blog Post'
                multiline
                minRows={9}
                maxRows={9}
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
            