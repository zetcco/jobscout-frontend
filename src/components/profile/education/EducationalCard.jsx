import React from "react";
import { Box, Typography} from "@mui/material"
import { CardWithCloseButton } from "components/CardWithCloseButton";

export const EducationalCard = ({ title,subtitle, duration, onClose }) => {
    return (
        <CardWithCloseButton onClose={onClose}>
            <Box
                  sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                  }}
            >
                <Typography variant="h6_bold">{ title }</Typography>
                <Typography variant="h6" sx={{ textOverflow: 'ellipsis' }}>{ subtitle }</Typography>
                <Typography variant="h6">{ duration }</Typography>
            </Box>
        </CardWithCloseButton>
    )
}
    