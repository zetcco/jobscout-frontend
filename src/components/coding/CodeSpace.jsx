import Editor from '@monaco-editor/react'
import { PlayCircleFilledRounded, RestoreRounded } from '@mui/icons-material'
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { BasicCard } from 'components/cards/BasicCard'
import { serverClient } from 'features/authSlice'
import { useState } from 'react'

const initial_output = {
    status: '',
    memory: '',
    time: '',
    message: '',
    stdout: null,
    stderr: null
}

export const CodeSpace = () => {

    const [ selectedLanguage, setSelectedLanguage ] = useState('')
    const [ sourceCode, setSourceCode ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ output, setOutput ] = useState(initial_output)

    const runCode = async () => {
        setLoading(true)
        const response = await serverClient.post('/code/submit', {
            source_code: btoa(sourceCode),
            language_id: selectedLanguage.id
        })
        setOutput(response.data)
        setLoading(false)
    }

    return (
        <Stack height={'100%'}>
            <Box height={'10%'} p={2}>
                <Stack height={'100%'} direction={'row'} spacing={2} justifyContent='space-between' alignItems={'center'}>
                    <Box width={{ xs: '60%', sm: '40%', md: '20%'}}>
                        <FormControl fullWidth>
                            <InputLabel>Select Language</InputLabel>
                            <Select label={"Select Language"} value={selectedLanguage} onChange={(e) => {
                                setSelectedLanguage(e.target.value)
                            }}>
                                { languages.map((language) => <MenuItem key={language.id} value={language}>{language.name}</MenuItem>) }
                            </Select>
                        </FormControl>
                    </Box>
                    <Stack width={{ md: '10%' }} direction='row' spacing={2} height={'100%'}>
                        <Button variant='contained' fullWidth startIcon={ loading ? <CircularProgress size={20} sx={{ color: 'inherit' }}/> : <PlayCircleFilledRounded/>} onClick={runCode} disabled={loading} >Run</Button>
                    </Stack>
                </Stack>
            </Box>
            <Box height={'60%'}>
                <Editor
                    height={'100%'}
                    width={'100%'}
                    language={selectedLanguage.value}
                    value={sourceCode}
                    onChange={(code) => setSourceCode(code)}
                    mt={0}
                />
            </Box>
            <Box height={'30%'}>
                <Stack direction={'row'} height='100%' spacing={2} p={2}>
                    <Box width={{ xs: '70%' }}>
                        <BasicCard sx={{ backgroundColor: 'rgb(30 41 59)', height: '100%', width: '100%' }} inner_sx={{ height: '100%', p: 0 }}>
                            <Box sx={{ overflowY: 'scroll' }} height={'100%'} width={'100%'} pl={2}>
                                <Box py={1} width={'100%'}>
                                    { output.stdout && <Typography sx={{ color: 'white' }}>{atob(output.stdout)}</Typography> }
                                    { output.stderr && <Typography sx={{ color: 'error.light' }}>{atob(output.stderr)}</Typography> }
                                </Box>
                            </Box>
                        </BasicCard>
                    </Box>
                    <Box width={{ xs: '30%' }}>
                        <BasicCard sx={{ height: '100%' }}>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                <tr>
                                    <th style={{ width: '20%' }}></th>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td><Typography fontWeight={'bold'}>{output.status}</Typography></td>
                                </tr>
                                <tr>
                                    <td>Memory</td>
                                    <td><Typography fontWeight={'bold'}>{output.memory}</Typography></td>
                                </tr>
                                <tr>
                                    <td>Time</td>
                                    <td><Typography fontWeight={'bold'}>{output.time}</Typography></td>
                                </tr>
                                <tr>
                                    <td>Message</td>
                                    <td><Typography fontWeight={'bold'}>{output.message && atob(output.message)}</Typography></td>
                                </tr>
                                </tbody>
                            </table>
                        </BasicCard>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

const languages = [ 
    { id: 50, name: "C", value: "c" },
    { id: 54, name: "C++", value: "cpp" },
    { id: 51, name: "C#", value: "c#" },
    { id: 62, name: "Java", value: "java" },
    { id: 63, name: "Javascript", value: "javascript" },
    { id: 68, name: "PHP", value: "php" },
    { id: 71, name: "Python (3.8.1)", value: "python" }
]

const fetchLanguages = async () => {
    const response = await serverClient.get('/code/languages')
    console.log(response.data)
    return response.data
}