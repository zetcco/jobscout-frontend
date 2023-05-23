import { Button, Stack, Typography } from '@mui/material'
import { AvatarWithInitials } from 'components/AvatarWithInitials'
import { RouterLink } from 'components/RouterLink'
import { BasicCard } from 'components/cards/BasicCard'

export const ProfileHeaderWithNameEmail = ({id, name, email, src, onDelete}) => {

  return (
    <BasicCard>
        <Stack direction={'row'} spacing={10}  justifyContent="space-between" >
            <Stack 
                direction={'row'} 
                spacing = {1}
                alignItems={'center'}
            >
                <AvatarWithInitials src={src} name={name} size={100}/>
                <Stack direction={'column'} spacing={0.1}>
                    <Typography variant='h4'>{ name }</Typography>
                    <Typography variant='h6'>{ email }</Typography>
                </Stack>
            </Stack>
            <Stack direction={'column'} spacing = {1.5}  justifyContent={'center'}>
            <RouterLink to={"/manage/recommendation/" +id}>
                <Button variant = "outlined">Recommendation</Button>
            </RouterLink>
            <Button variant = "outlined" onClick={onDelete}>Delete</Button>
        </Stack> 
        </Stack>
    </BasicCard>
  )
}
