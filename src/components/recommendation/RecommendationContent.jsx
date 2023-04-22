import { Grid, Stack, TextField, Button } from '@mui/material';
import { CenteredHeaderCard } from '../cards/CenteredHeaderCard';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectAuthUserId, serverClient } from 'features/authSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecommendationContent() {
  const navigate = useNavigate();
  
  const { requesterId } = useParams();
  // console.log(requesterId);
  const [ content, setContent ] = useState('');
  const responderId = useSelector(selectAuthUserId);
  const [ loading, setLoading ] = useState(false);
  

  const onSubmit = async (e) => {
    setLoading(current => current)
    // console.log(loading)  

    const response = await serverClient.post(
          '/recommendations/add', 
          {
            content,
            responder: { id: responderId },
            requester: { id: requesterId }
            }
    )
    if(response.status === 200 ) {
      navigate(-1)
    }
    setLoading(current => !current)
  }

  const onCancel =  () => {
    navigate(-1);
  }


  return (
    <>
      <Stack>
        <CenteredHeaderCard
          title={'Create Recommendation'}
          footer={
            <Stack direction={'row'} spacing={2} md={6}>
              <Button onClick={onCancel} variant='outlined' fullWidth>
                Cancel
              </Button>
              <Button onClick={onSubmit} variant='contained' fullWidth disabled = {content === '' || loading === 'true'}>
                Submit
              </Button>
            </Stack>
          }
        >
            <Grid item xs={12} md={12}>
              <TextField
                id='outlined-multiline-static'
                label='Recommendation'
                placeholder='Enter the Recommendation'
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          {/* </Grid> */}
        </CenteredHeaderCard>
      </Stack>
    </>
  );
};

