import { Stack, Box, Typography } from '@mui/material';
import { useRef } from 'react'
import { DashedArea } from './DashedArea';

export const UploadArea = ({ text, register, error, files, multiple, accept, disabled, src, showPreview }) => {

    const imgRef = useRef(null)
    const hiddenFileInput = useRef(null);
    const { ref, ...rest } = register

    const handleClick = (_) => {
        hiddenFileInput.current.click();
    }

    const fileList = files?.length > 0 ? [...files] : []

    if (fileList.length === 1 && showPreview)
        imgRef.current.src = URL.createObjectURL(fileList[0])

    return (
        <Stack spacing={2}>
            <Stack direction={'row'} sx={{ width: '100%' }} spacing={2} alignItems={'center'}>
                { showPreview && 
                <Box>
                    <img style={{ height: 100, opacity: disabled ? 0.5 : 1 }} ref={imgRef} src={src}/> 
                </Box> 
                }
                <DashedArea text={text} onClick={handleClick} error={error} disabled={disabled}/>
            </Stack>
            <input type="file" {...rest} ref={(e) => {
                ref(e)
                hiddenFileInput.current = e
            }} style={{ display: 'none' }}
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            />
            <Box>
                {
                    fileList.map((file, index) => <Typography variant='subtitle2' key={index} sx={{ opacity: disabled ? 0.5 : 1 }}>{file.name}</Typography>)
                }
            </Box>
        </Stack>
    )
}
