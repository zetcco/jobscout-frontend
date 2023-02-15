import React from "react";
import { Box, Typography} from "@mui/material"
import { CardWithCloseButton } from "components/CardWithCloseButton";

export const EducationalCard = ({DegreeName,Institution,Duration}) => {
    return (
        <CardWithCloseButton>
            <Box>
                <Typography variant="h6_bold">{ DegreeName }</Typography>
                <Typography variant="h6">{ Institution }</Typography>
                <Typography variant="h6">{ Duration }</Typography>
            </Box>
        </CardWithCloseButton>
    )
}
    