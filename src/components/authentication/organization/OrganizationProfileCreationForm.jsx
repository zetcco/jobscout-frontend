import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthLoading,
  uploadBusinessRegistration,
} from '../../../features/authSlice';
import { CenteredHeaderCard } from '../../cards/CenteredHeaderCard';
<<<<<<< Updated upstream
=======
import { DashedArea } from '../../input/DashedArea';
>>>>>>> Stashed changes
import { UploadArea } from '../../input/UploadArea';

export const OrganizationProfileCreationForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const [file, setFile] = useState();

  console.log(file);

  return (
    <CenteredHeaderCard title={'Create your Profile'}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <UploadArea
          text={'Click here to Upload Logo'}
          handleFile={(data) => {
            setFile(data);
          }}
        />
        {file && <Typography>{file.name}</Typography>}
        <Stack spacing={2} direction='row'>
          <Button variant='outlined' sx={{ width: '100%' }}>
            Skip
          </Button>
          <Button
            disabled={loading && true}
            variant='contained'
            onClick={() => dispatch(uploadBusinessRegistration(file))}
            sx={{ width: '100%' }}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </CenteredHeaderCard>
  );
};
