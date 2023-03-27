import { Stack } from "@mui/system";
import { Box, FormHelperText ,Tooltip,Typography} from "@mui/material";
import { AvatarWithInitials } from "components/AvatarWithInitials";
import { EditIcon } from "routes/profile/EditIcon";
import { transform } from "lodash";

export const ProfileWithFullNameSubtitle = ({title , name , subtitle, src, onHover }) => {
    return ( 
            <Stack direction={'column'} spacing={1}>
                    <FormHelperText>{ title }</FormHelperText>                 
                    <Stack direction={'row'} spacing = {1.5} alignItems={'center'}>
                        <AvatarWithInitials size={{ xs: 80, md: 100 }} src={src} name={name} onHover={onHover}/>
                        <Stack direction={'column'}>
                            <Typography variant='profile_name'>{ name }</Typography>
                            { subtitle && <Typography variant= 'button'>{ subtitle }</Typography>  }
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
