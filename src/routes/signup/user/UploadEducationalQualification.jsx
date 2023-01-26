import React from 'react';
import { Button, Stack, TextField, Typography, Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { CenteredHeaderCard } from '../../../components/cards/CenteredHeaderCard';

const UploadEducationalQualification = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <CenteredHeaderCard
        title={'Add Educational Qualification'}
        footer={
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
              <Button variant='outlined' fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant='contained' fullWidth>
                Done
              </Button>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              id='outlined-basic'
              label='Search for Qualification'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id='outlined-basic'
              label='Search for Insitute'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='outlined-basic'
              label='Enter Starting Year'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='outlined-basic'
              label='Enter Ending Year'
              variant='outlined'
              fullWidth
            />
          </Grid>
        </Grid>
      </CenteredHeaderCard>
    </Stack>
  );
};

export default UploadEducationalQualification;

{
  /* <Stack display="flex" flexDirection='row'>
        <Typography>Add Educational Qualification</Typography>
        <CancelIcon />
    </Stack>
      <Stack spacing={2}>
        <TextField
          id='outlined-basic'
          label='Add your organization'
          variant='outlined'
        />
        <TextField
          id='outlined-basic'
          label='Add your organization'
          variant='outlined'
        />
      </Stack>
      <Stack sx={5} direction='row'/>
      <TextField
        id='outlined-basic'
        label='Add your organization'
        variant='outlined'
      />
      <TextField
        id='outlined-basic'
        label='Add your organization'
        variant='outlined'
      />
      <Stack sx={4} spacing={2} />
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button> */
}
