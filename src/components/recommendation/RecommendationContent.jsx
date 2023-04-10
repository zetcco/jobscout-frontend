import { Grid, Stack, TextField, Button } from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';
import React from 'react'

export default function RecommendationContent() {
  return (
    <>
      <Stack>
        <CenteredHeaderCard
          title={'Create Recommendation'}
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
                label='Recommendation Title'
                placeholder='Enter the Recommendation Title'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id='outlined-multiline-static'
                label='Recommendation'
                placeholder='Enter the Recommendation'
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
              />
            </Grid>
          </Grid>
        </CenteredHeaderCard>
      </Stack>
    </>
  );
};

