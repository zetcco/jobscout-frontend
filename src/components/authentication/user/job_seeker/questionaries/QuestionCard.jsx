import { ArrowForwardIosOutlined } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { SelectableCard } from 'components/cards/SelectableCard'
import React from 'react'
import { useNavigate } from 'react-router'

export const QuestionCard = ({ id, name, description }) => {

    const navigate = useNavigate()

    return (
        <SelectableCard onClick={() => { navigate(`/questionaries/${id}`) }}>
          <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
            <Stack spacing={0.5} direction={'column'}>
              <Typography variant='h6_bold'>{ name }</Typography>
              <Typography>{ description }</Typography>
            </Stack>
            <Stack justifyContent={'center'}>
              <IconButton size='large' color='success' >
                <ArrowForwardIosOutlined />
              </IconButton>
            </Stack>
          </Stack>
        </SelectableCard>
    )
}
