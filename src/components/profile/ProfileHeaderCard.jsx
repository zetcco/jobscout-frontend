import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileHeaderCard = ({title , name , subtitle}) => {
    return ( 
            <Stack direction={'column'} spacing={1}>
                    { title && <FormHelperText>{ title }</FormHelperText> }
                    <Stack 
                            direction={'row'} 
                            spacing = {0.5}
                            alignItems={'center'}
                            >
                        <AccountCircleIcon style={{fontSize: 40 }}/>
                        <Stack direction={'column'} spacing={1}>
                            <Typography variant= 'h6'>{ name }</Typography>
                            { subtitle && (<FormHelperText>{ subtitle }</FormHelperText>) }
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
 
export default ProfileHeaderCard;