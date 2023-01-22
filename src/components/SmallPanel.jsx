import React from "react";
import { Stack } from "@mui/system";
import { Box, Typography} from "@mui/material";
import { BasicCard } from "./BasicCard";


const SmallPanel = ({mainTitle ,children, sx}) => {
    return ( 
        <BasicCard sx={sx}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='button'>{ mainTitle }</Typography>
                <Box>
                    { children }
                </Box>
            </Stack>
        </BasicCard>
     );
}
 
export default SmallPanel;