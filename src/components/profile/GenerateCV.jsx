import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { SelectableCard } from 'components/cards/SelectableCard'
import SmallPanel from 'components/SmallPanel'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const GenerateCV = () => {

    const authUserToken = useSelector(selectAuthUserToken)
    const [ templates, setTemplates ] = useState([])
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ selected, setSelected ] = useState(null)
    const [ fetchingPdf, setFetchingPdf ] = useState(false)

    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true)
            try {
                const response = await axios.get('/cv/templates', { headers: { Authorization: `Bearer ${authUserToken}` } })
                setTemplates(response.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchTemplates()
    }, [])

    const downloadCV = async () => {
        setFetchingPdf(true)
        const response = await axios.get(`/cv/generate/${selected}`, { headers: { Authorization: `Bearer ${authUserToken}` }, responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.headers["content-disposition"]);
        document.body.appendChild(link);
        link.click();
        setFetchingPdf(false)
    }

    return (
    <SmallPanel mainTitle={"Select a Template"} sx={{ width: { xs: '95%', md: '50%' } }}>
        <Grid container spacing={2} height={{ xs: '60vh', md: '50vh' }} sx={{ overflowY: 'scroll' }}>
            {
                loading ? (
                    <Typography>Loading</Typography>
                ) : (
                    templates.map((template, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <SelectableCard padding={{ xs: 1 }} selected={selected === template.id} onClick={() => setSelected(template.id)}>
                                <img src={template.preview} width="100%" style={{
                                    borderRadius: '15px'
                                }}/>
                            </SelectableCard>
                        </Grid>
                    ))
                )
            }
            </Grid>
            <Stack direction={"row"} spacing={2} mt={2}>
                <Button variant='outlined' fullWidth>Cancel</Button>
                <Button variant='contained' fullWidth onClick={downloadCV} disabled={selected === null || fetchingPdf} startIcon={ fetchingPdf ? <CircularProgress sx={{ color: 'grey.400' }} size={20}/> : undefined } >Download</Button>
            </Stack>
    </SmallPanel>
  )
}
