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
            <Stack direction={"row"} spacing={2}>
              <Button variant='outlined' fullWidth>Cancel</Button>
              <Button variant='contained' fullWidth>Done</Button>
            </Stack>
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
