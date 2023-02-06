import React from 'react'
import { useRef } from 'react'
import { DashedArea } from './DashedArea';

export const UploadArea = ({ text, handleFile }) => {

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    }

    const handleChange = event => {
        handleFile(event.target.files[0]);
    }

    return (
    <>
        <DashedArea text={text} onClick={handleClick}/>
        <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }}/>
    </>
    )
}
