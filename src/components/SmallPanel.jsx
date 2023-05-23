import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { BasicCard } from "./cards/BasicCard";


const SmallPanel = ({mainTitle ,children, sx, ref, noElevation, padding, divsx}) => {
    return ( 
        <BasicCard sx={sx} divsx={divsx} noElevation={noElevation} padding={padding}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='button'>{ mainTitle }</Typography>
                <Stack  direction = {'column'}>
                    { children }
                </Stack>
            </Stack>
        </BasicCard>
     );
}
 
export default SmallPanel;