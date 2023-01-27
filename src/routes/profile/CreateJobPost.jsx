import { Grid, Stack, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CenteredHeaderCard } from '../../components/cards/CenteredHeaderCard';
import { DesignedTopbar } from '../../components/layout/DesignedTopbar';

export const CreateJobPost = () => {
  const [value, setValue] = useState(dayjs('2018-01-01T00:00:00.000Z'));

  return (
    <>
      <Stack>
        <DesignedTopbar/>
      </Stack>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label='Closing Date'
                  renderInput={(params) => <TextField {...params} />}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  sx={{width: '100%'}}
                  fullWidth
                />
              </LocalizationProvider>
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
