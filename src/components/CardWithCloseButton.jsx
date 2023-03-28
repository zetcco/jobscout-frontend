import { Box, Grid, IconButton } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BasicCard } from './cards/BasicCard';

export const CardWithCloseButton = ({children, onClose}) => {
  return (
    <BasicCard>
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
                <Box sx={{ width: '80%' }} >
                    {children}
                </Box>
                <Box>
                  <IconButton onClick={onClose} sx={{ color: (theme) => theme.palette.common.black  }}>
                    <HighlightOffIcon fontSize="large"/>
                  </IconButton>
                </Box>
        </Grid>
    </BasicCard>
  )
}
