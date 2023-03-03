import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AvatarWithInitials } from "components/AvatarWithInitials";

const ProfileHeaderCard = ({title , name , subtitle, src, sx}) => {
    return ( 
            <Stack direction={'column'} spacing={2} sx={sx}>
                    { title && <FormHelperText>{ title }</FormHelperText> }
                    <Stack 
                            direction={'row'} 
                            spacing = {0.5}
                            alignItems={'center'}
                            >
                        <AvatarWithInitials src={src} name={name}/>
                        <Stack direction={'column'} spacing={1}>
                            <Typography variant= 'h6'>{ name }</Typography>
                            { subtitle && (<FormHelperText>{ subtitle }</FormHelperText>) }
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
 
export default ProfileHeaderCard;