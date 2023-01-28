import { Grid, Stack, TextField, Button } from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';

export const CreateJobPostForm = () => {

  return (
    <>
      <Stack>
        <CenteredHeaderCard
          title={'Create Job Post'}
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
                label='Title'
                placeholder='Enter the Title'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id='outlined-multiline-static'
                label='Description'
                placeholder='Enter the Description'
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id='outlined-basic'
                label='Select Category'
                placeholder='Search for Category'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Date of Birth'
                type='date'
                placeholder='Enter your Date of Birth'
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id='outlined-basic'
                label='Select Type'
                placeholder='Search for Type'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id='outlined-basic'
                label='Select Type'
                placeholder='Search for Type'
                variant='outlined'
                fullWidth
              />
            </Grid>
          </Grid>
        </CenteredHeaderCard>
      </Stack>
    </>
  );
};
