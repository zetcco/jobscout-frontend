import React, { useEffect, useRef } from 'react'
import { BasicCard } from './cards/BasicCard';

export const Video = ({ srcObject }) => {

    const element = useRef(null);

    useEffect(() => {
        element.current.srcObject = srcObject
    }, [srcObject])

    return (
        <>
            <BasicCard>
                <video ref={element} style={{
                    width: '100%',
                    transform: `scale(-1, 1)`,
                    WebkitTransform: `scale(-1, 1)`
                }} autoPlay/>
            </BasicCard>
        </>
    )
}
