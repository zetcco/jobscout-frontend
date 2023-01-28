import React from "react";
import { Box, Grid, Typography} from "@mui/material"
import { BasicCard } from "../../cards/BasicCard";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const EducationalCard = ({DegreeName,Institution,Duration}) => {
    return (
        <BasicCard>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                >
                    <Grid item>
                        <Box>
                            <Typography variant="h6_bold">{ DegreeName }</Typography>
                            <Typography variant="h6">{ Institution }</Typography>
                            <Typography variant="h6">{ Duration }</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <HighlightOffIcon fontSize="large"/>
                    </Grid>
            </Grid>
        </BasicCard>
    )
}
    