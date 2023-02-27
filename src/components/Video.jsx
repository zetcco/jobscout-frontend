import React, { useEffect, useRef } from 'react'

export const Video = ({ srcObject }) => {

    const element = useRef(null);

    useEffect(() => {
        element.current.srcObject = srcObject
    }, [srcObject])

    return (
        <>
            <video ref={element} style={{
                transform: `scale(-1, 1)`,
                WebkitTransform: `scale(-1, 1)`
            }} autoPlay/>
        </>
    )
}
