import { Stack, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { DashedArea } from './DashedArea';
import CloseIcon from '@mui/icons-material/Close';

export const UploadArea = ({ text, register, error, files }) => {

    const hiddenFileInput = useRef(null);
    const { ref, ...rest } = register

    const handleClick = (_) => {
        hiddenFileInput.current.click();
    }

    return (
        <Stack spacing={2}>
            <DashedArea text={text} onClick={handleClick} error={error}/>
            <input type="file" {...rest} ref={(e) => {
                ref(e)
                hiddenFileInput.current = e
            }} style={{ display: 'none' }}/>
            <Box>
                {
                    files.length > 0 && (
                        files.map()
                    )
                }
                <Typography>filename.txt</Typography>
                <Typography>filename.txt</Typography>
            </Box>
        </Stack>
    )
}
