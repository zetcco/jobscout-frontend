import React from "react";
import { Box, Grid, Typography} from "@mui/material"
import { BasicCard } from "../../BasicCard";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const EducationalCard = () => {
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
                            <Typography variant="h4">Bachelor of Computer Science</Typography>
                            <Typography variant="h6">University of Ruhuna</Typography>
                            <Typography variant="h6">2018 - 2022</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <HighlightOffIcon fontSize="large"/>
                    </Grid>
            </Grid>
        </BasicCard>
    )
}
    