import { Stack } from "@mui/system";
import { FormHelperText ,Typography} from "@mui/material";
import { AvatarWithInitials } from "components/AvatarWithInitials";

export const ProfileWithFullNameSubtitle = ({title , name , subtitle, src}) => {
    return ( 
            <Stack direction={'column'} spacing={1}>
                    <FormHelperText>{ title }</FormHelperText>                 
                    <Stack direction={'row'} spacing = {1.5} alignItems={'center'}>
                        <AvatarWithInitials size={{ xs: 80, md: 100 }} src={src} name={name}/>
                        <Stack direction={'column'}>
                            <Typography variant='profile_name'>{ name }</Typography>
                            { subtitle && <Typography variant= 'button'>{ subtitle }</Typography>  }
                        </Stack>                      
                    </Stack>
            </Stack>
     );
}
