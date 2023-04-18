import { Stack } from '@mui/material';
import axios from 'axios';
import { ProfileHeaderWithNameEmail } from 'components/profile/ProfileHeaderWithNameEmail';
import { selectAuthUserToken } from 'features/authSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RecommendationRequests() {
    let navigate = useNavigate();

    const [ requesters, setRequesters ] = useState([]);

    const authToken = useSelector(selectAuthUserToken);
    // console.log(authToken);

    useEffect(() => {
        // console.log("opend")
        loadPage();
    }, []);

    const loadPage = async () => {
        const response = await axios.get(
            '/recommendations/requests',
            { headers : {
                Authorization: `Bearer ${authToken}`
            }}
        ); 
        setRequesters(response.data)
    }
    
    const onDelete = async (id) => {
        const response = await axios.delete(
            '/recommendations/deleterequest', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: { "requesterId": id }
            },
            navigate()
        );
        if (response.status === 200)
            setRequesters(requesters.filter(request => request.id !== id))
    }

  return (
    <Stack>
        <Stack direction={'column'} spacing={2}>
            {
                requesters.map(
                    (requester, index) => (
                        <ProfileHeaderWithNameEmail key={requester.id} 
                            id={requester.id} name={requester.displayName} email={requester.email} src={requester.displayPicture} 
                            onDelete={() => { onDelete(requester.id) }}
                        />
                    ))
            }
        </Stack>
    </Stack>
  )

}
