import { Button, Stack } from '@mui/material';
import axios from 'axios';
import ProfileHeaderCard from 'components/profile/ProfileHeaderCard';
import { ProfileHeaderWithNameEmail } from 'components/profile/ProfileHeaderWithNameEmail';
import { ProfileWithFullNameSubtitleSmall } from 'components/profile/ProfileWithFullNameSubtitleSmall';
import { selectAuthUserToken } from 'features/authSlice';
import { RouterLink } from 'components/RouterLink'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function RecommendationRequests() {

    const [ requester, setRequester ] = useState(null);
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
    

  return (
    <Stack>
        <Stack direction={'column'} spacing={2}>
            {
                requesters.map(
                    (requester, index) => (
                        <ProfileHeaderWithNameEmail key={requester.id} 
                            id={requester.id} name={requester.displayName} email={requester.email} src={requester.displayPicture} 
                        />
                    ))
            }
        </Stack>
        {/* <Stack direction={'column'} spacing = {0.5}  justifyContent={'center'}>
            <RouterLink to={"/recommendation/9"}>
                <Button>Recommendation</Button>
            </RouterLink>
            <Button>Delete</Button>
        </Stack> */}
    </Stack>
  )

}
