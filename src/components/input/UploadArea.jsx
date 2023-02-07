import React from 'react'
import { useRef } from 'react'
import { DashedArea } from './DashedArea';

export const UploadArea = ({ text, register, error }) => {

    const hiddenFileInput = useRef(null);
    const { ref, ...rest } = register

    const handleClick = (_) => {
        hiddenFileInput.current.click();
    }

    return (
    <>
        <DashedArea text={text} onClick={handleClick} error={error}/>
        <input type="file" {...rest} ref={(e) => {
            ref(e)
            hiddenFileInput.current = e
        }} style={{ display: 'none' }}/>
    </>
    )
}
