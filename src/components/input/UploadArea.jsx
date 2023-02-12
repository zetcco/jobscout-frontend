import { Stack, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { DashedArea } from './DashedArea';
import CloseIcon from '@mui/icons-material/Close';

export const UploadArea = ({ text, register, error, files, multiple }) => {

    const hiddenFileInput = useRef(null);
    const { ref, ...rest } = register

    const handleClick = (_) => {
        hiddenFileInput.current.click();
    }

    const fileList = files?.length > 0 ? [...files] : []

    return (
        <Stack spacing={2}>
            <DashedArea text={text} onClick={handleClick} error={error}/>
            <input type="file" {...rest} ref={(e) => {
                ref(e)
                hiddenFileInput.current = e
            }} style={{ display: 'none' }}
            multiple={multiple}/>
            <Box>
                {
                    fileList.map((file, index) => <Typography variant='subtitle2' key={index}>{file.name}</Typography>)
                }
            </Box>
        </Stack>
    )
}
