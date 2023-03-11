import {Typography ,Button} from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { BasicCard } from '../cards/BasicCard'
import ProfileHeaderCard from '../profile/ProfileHeaderCard'

function AddRecommendationFrom() {
  return (
    <>
        <BasicCard>
            <Stack direction="colomn" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                            <ProfileHeaderCard name={'Pasindu Deshan'} /> 
                    </Stack>
                    <Stack alignItems={'flex-start'}>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales rhoncus hendrerit. 
                            In tincidunt consectetur auctor. Sed tincidunt fringilla tortor ut hendrerit. Nulla lobortis 
                            metus vel libero maximus laoreet. Vestibulum sed ligula eget leo aliquam volutpat vel eu quam. 
                            Donec fringilla elit a interdum cursus. Fusce finibus ante erat, quis ultricies augue tristique vel. 
                            Nulla venenatis maximus lacus et pulvinar. Fusce interdum finibus ipsum, a pellentesque quam feugiat 
                            non. Mauris imperdiet libero id nisl vulputate, quis venenatis lectus pulvinar. Vestibulum sed eros 
                            nec orci lacinia pretium laoreet vitae nunc. Nullam tincidunt arcu at sagittis efficitur. Morbi eget 
                            leo imperdiet, tempus neque at, euismod risus. Fusce nec ullamcorper lacus.
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </BasicCard>
    </>
  )
}

export default AddRecommendationFrom
