import React from "react";
import { Box, Typography} from "@mui/material"
import { CardWithCloseButton } from "components/CardWithCloseButton";

export const EducationalCard = ({ title,subtitle, duration, onClose }) => {
    return (
        <CardWithCloseButton onClose={onClose}>
            <Box>
                <Typography variant="h6_bold">{ title }</Typography>
                <Typography variant="h6">{ subtitle }</Typography>
                <Typography variant="h6">{ duration }</Typography>
            </Box>
        </CardWithCloseButton>
    )
}
    