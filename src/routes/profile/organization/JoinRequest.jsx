import { Button, Stack } from '@mui/material';
import axios from 'axios';
import { BasicCard } from 'components/cards/BasicCard';
import { ProfileWithFullNameSubtitle } from 'components/profile/ProfileWithFullNameSubtitle';
import { selectAuthUserToken } from 'features/authSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const JoinRequest = () => {
const [requests, setRequests] = useState([]);

const authToken =useSelector(selectAuthUserToken);

const acceptReq = async() =>{
  const response = await axios.get(
    'organization/accept-request',
    {headers:{
      Authorization : `Bearer ${authToken}`
    }
  })
}
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
      <>
      {requests.map((request, index) =>(
      <BasicCard>
        <Stack  justifyContent={'flex-start'} alignItems="center" direction="row" spacing={2} key={index}>
          <Stack>
            <ProfileWithFullNameSubtitle name={request.displayName} subtitle={request.email}/>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Button variant='outlined' onClick={acceptReq}>ACCEPT</Button>
            <Button variant='outlined'>REJECT</Button>
          </Stack>
        </Stack>
      </BasicCard>
      ))}
    </>
  )
}
export default JoinRequest
