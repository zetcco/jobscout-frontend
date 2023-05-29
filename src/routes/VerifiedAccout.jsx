import { Verified } from '@mui/icons-material'
import { Avatar, Button, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { CenteredHeaderCard } from 'components/cards/CenteredHeaderCard'
import { useFetch } from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const VerifiedAccout = () => {

    const navigate = useNavigate()
    const key = new URLSearchParams(useLocation().search).get("key");
    const [ status, setStatus ] = useState("Verification Pending")

    useEffect(() => {
        const verifyAcc = async () => {
            try {
                await axios.get(`/verify?key=${key}`)
                setStatus('Your account has been successfully verified.')
            } catch (e) {
                setStatus("Verification Failed");
            }
        }
        verifyAcc()
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <CenteredHeaderCard
                title = {"Account Verification"}
                icon = {<Avatar style = {{backgroundColor:'#28AF38'}}><Verified/></Avatar>}
                >
                    <Typography variant='h6'>{status}</Typography>
                    <Button onClick={() => { navigate("/login") }}>Continue to Login</Button>
                </CenteredHeaderCard>
            </Grid>
        </Grid>
    )
}
