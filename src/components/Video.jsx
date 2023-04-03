import React, { useEffect, useRef } from 'react'
import { BasicCard } from './cards/BasicCard';
import { Box, CircularProgress, Stack } from '@mui/material';

export const Video = ({ srcObject, muted, controls }) => {

    const element = useRef(null);

    useEffect(() => {
        element.current.srcObject = srcObject
    }, [srcObject])

    return (
        <>
            <BasicCard
                sx={{
                    aspectRatio: '16/9',
                    padding: 0,
                    overflow: 'hidden'
                }}
                inner_sx={{
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    position: 'relative'
                }}
                padding={'0px'}
            >   
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ width: '100%', height: '100%' }}>
                    { srcObject !== null ? (
                        <video ref={element} style={{
                            transform: `scale(-1, 1)`,
                            WebkitTransform: `scale(-1, 1)`,
                            height: '100%',
                            width: '100%'
                        }} autoPlay muted={muted}/>
                    ) : (
                        <CircularProgress/>
                    ) }
                </Stack>
                { controls && (
                    <Box sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                        { controls }
                    </Box>
                )}
            </BasicCard>
        </>
    )
}
