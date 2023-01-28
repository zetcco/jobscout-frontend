import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ProfileWithFullNameSubtitleSmall = ({title , name , subtitle}) => {
    return ( 
            <Stack direction={'column'} spacing={1}>
                    <FormHelperText>{ title }</FormHelperText>                 
                    <Stack direction={'row'} spacing = {0.5} alignItems={'center'}>
                        <AccountCircleIcon sx={ {fontSize:{ xs: 50, md: 70 } }}/>
                        <Stack direction={'column'} spacing={0.2}>
                            <Typography variant='h4'>{ name }</Typography>
                            { subtitle && <Typography variant= 'button'>{ subtitle }</Typography>  }
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
