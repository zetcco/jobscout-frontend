import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { BasicCard } from "./cards/BasicCard";


const SmallPanel = ({mainTitle ,children, sx, glassEffect, padding}) => {
    return ( 
        <BasicCard sx={sx} padding={padding} glassEffect={glassEffect}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='button'>{ mainTitle }</Typography>
                <Stack  direction = {'column'}>
                    { children }
                </Stack>
            </Stack>
        </BasicCard>
     );
}

SmallPanel.defaultProps = {
    glassEffect: true
}
 
export default SmallPanel;