import React from 'react'

import Editor from '@monaco-editor/react'

export const CodeEditor = () => {
    return (
        <Editor
            height={'85vh'}
            width={'100%'}
            language={'javascript'}
            defaultValue={'// Test'}
        />
    )
}