import { Stack, TextField, Button } from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectAuthUserId } from 'features/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';

export default function AddRecommendationForm() {
  const navigate = useNavigate();
  
  const { requesterId } = useParams();
  const [ content, setContent ] = useState('');
  const responderId = useSelector(selectAuthUserId);
  const [ loading, setLoading ] = useState(false);
  const fetch = useFetch()

  const onSubmit = async (e) => {
    setLoading(true)
    await fetch(
      '/recommendations/add', "POST",
      { data: {
          content,
          responder: { id: responderId },
          requester: { id: requesterId }
        },
        successMsg: "Recommendation added",
        errorMsg: "Failed to add recommendation",
        onSuccess: () => { navigate(-1) },
      }
    )
    setLoading(false)
  }

  const onCancel =  () => {
    navigate(-1);
  }

  return (
    <>
      <CenteredHeaderCard
        title={'Create Recommendation'}
        footer={
          <Stack direction={'row'} spacing={2} md={6}>
            <Button onClick={onCancel} variant='outlined' fullWidth>
              Cancel
            </Button>
            <Button onClick={onSubmit} variant='contained' fullWidth disabled = {content === '' || loading}>
              Submit
            </Button>
          </Stack>
        }
      >
      <TextField
        label='Recommendation'
        placeholder='Enter the Recommendation'
        multiline
        minRows={3}
        maxRows={6}
        fullWidth
        inputProps={{ maxLength: 256 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      </CenteredHeaderCard>
    </>
  );
};

