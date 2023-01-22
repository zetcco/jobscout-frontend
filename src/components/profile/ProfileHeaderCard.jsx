import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileHeaderCard = ({title , name , subtitle , iconSize}) => {
    return ( 
            <Stack direction={'column'} spacing={1}>
                    <FormHelperText>{ title }</FormHelperText>                 
                    <Stack 
                            direction={'row'} 
                            spacing = {0.5}
                            alignItems={'center'}
                            >
                        <AccountCircleIcon sx={{fontSize:40}}/>
                        <Stack direction={'column'} spacing={1} alignItems="center">
                            <Typography variant= 'body'>{ name }</Typography>
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
 
export default ProfileHeaderCard;