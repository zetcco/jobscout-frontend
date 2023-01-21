import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileWithHeader = ({title , name , subtitle , iconSize}) => {
    return ( 
            <Stack direction={'column'} spacing={1}>
                    <FormHelperText>{ title }</FormHelperText>                 
                    <Stack 
                            direction={'row'} 
                            spacing = {0.5}
                            alignItems={'center'}
                            >
                        <AccountCircleIcon sx={{fontSize:50}}/>
                        <Stack direction={'column'} spacing={1}>
                            <Typography variant= 'h6'>{ name }</Typography>
                            <FormHelperText>{ subtitle }</FormHelperText>  
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
 
export default ProfileWithHeader;