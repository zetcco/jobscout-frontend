import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import { AvatarWithInitials } from "components/AvatarWithInitials";

const ProfileHeaderCard = ({title , name , subtitle, src, sx, dpSize}) => {
    return ( 
            <Stack direction={'column'} spacing={2} sx={sx}>
                    { title && <FormHelperText>{ title }</FormHelperText> }
                    <Stack 
                            direction={'row'} 
                            spacing = {1}
                            alignItems={'center'}
                            >
                        <AvatarWithInitials size={dpSize} src={src} name={name}/>
                        <Stack direction={'column'} spacing={1}>
                            <Typography variant= 'body1'>{ name }</Typography>
                            { subtitle && (<FormHelperText>{ subtitle }</FormHelperText>) }
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
 
export default ProfileHeaderCard;