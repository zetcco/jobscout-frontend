import { Button, Grid, Stack, TextField } from '@mui/material'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import React from 'react'

const CreateBlogPostForm = () => {
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
              <Button variant='contained' fullWidth>
                Submit
              </Button>
            </Stack>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                id='outlined-basic'
                label='Blog Post Title'
                placeholder='Enter the Blog Post Title'
                variant='outlined'
                fullWidth
              />
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
              />
            </Grid>
          </Grid>
        </CenteredHeaderCard>
      </Stack>
    </div>
  )
}

export default CreateBlogPostForm
