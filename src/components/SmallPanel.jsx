import React from "react";
import { Stack } from "@mui/system";
import { Typography} from "@mui/material";
import { BasicCard } from "./BasicCard";


const SmallPanel = ({mainTitle ,children, sx}) => {
    return ( 
        <BasicCard sx={sx}>
            <Stack direction={'column'} spacing={2}>
        `       <Stack>
                        <Typography variant='h5'>{ mainTitle }</Typography>
                </Stack>
                <Stack>
                    { children }
                </Stack>                   
            </Stack>
        </BasicCard>
     );
}
 
export default SmallPanel;