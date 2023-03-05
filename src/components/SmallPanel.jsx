import React from "react";
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { BasicCard } from "./cards/BasicCard";


const SmallPanel = ({mainTitle ,children, sx, ref}) => {
    return ( 
        <BasicCard sx={sx}>
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