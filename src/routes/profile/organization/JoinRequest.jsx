import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { BasicCard } from 'components/cards/BasicCard';
import ProfileWithHeader from 'components/profile/ProfileWithHeader';
import { selectAuthUserToken } from 'features/authSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const JoinRequest = () => {
const [requests, setRequests] = useState([]);
const authToken =useSelector(selectAuthUserToken);

const myFunction = async() =>{
  const response = await axios.get(
    'organization/join-request',
    {headers:{
      Authorization : `Bearer ${authToken}`
    }
    });
    //console.log(response.data);
    setRequests(response.data)
}
useEffect(() =>{
  myFunction()
  //console.log('Niro');
},[])
  return (
    <BasicCard>
      <Stack  spacing={2} >
      {requests.map((request,index) =>(
        
          <Box>
            <Stack  justifyContent={'flex-start'} alignItems="center" direction="row" spacing={2} key={index}>
              <ProfileWithHeader name={request.displayName} />
              <Typography>{request.email} </Typography>
            </Stack>
          </Box>
          ))}
          <Box>
            <Stack direction={"row"} spacing={2}>
              <Button variant='outlined'>ACCEPT</Button>
              <Button variant='outlined'>REJECT</Button>
            </Stack>
          </Box>
        </Stack>
      
    </BasicCard>
  )
}
export default JoinRequest
