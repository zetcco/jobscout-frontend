import { ArrowForwardIosOutlined, DeleteOutline, EditRounded } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { SelectableCard } from 'components/cards/SelectableCard'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export const QuestionCard = ({ id, name, description, badge, onDelete }) => {

    const [ toggleDelete, setToggleDelete ] = useState(false)
    const navigate = useNavigate()

    return (
        <SelectableCard onClick={() => { navigate(`/questionaries/${id}`) }} onMouseEnter={onDelete ? (() => { setToggleDelete(true) }) : undefined} onMouseLeave={onDelete ? (() => { setToggleDelete(false) }) : undefined}>
          <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
            <Stack direction={'row'} spacing={3}>
              <img style={{ width: 60, height: 60 }} src={badge} />
              <Stack spacing={0.5} direction={'column'} justifyContent={'center'}>
                <Typography variant='h6_bold'>{ name }</Typography>
                { description && <Typography>{ description }</Typography> }
              </Stack>
            </Stack>
            <Stack justifyContent={'center'}>
              {
                toggleDelete ? (
                  <Stack direction={'row'} alignItems={'center'}>
                    <IconButton size='large' color='error' onClick={(e) => {
                      e.stopPropagation()
                      onDelete()
                    }}>
                      <DeleteOutline/>
                    </IconButton>
                    <IconButton size='large' color='success' onClick={(e) => { 
                      e.stopPropagation()
                      navigate(`/questionaries/${id}/edit`) 
                    }}>
                      <EditRounded/>
                    </IconButton>
                  </Stack>
                ) : (
                  <IconButton size='large' color='success' >
                    <ArrowForwardIosOutlined />
                  </IconButton>
                )
              }
            </Stack>
          </Stack>
        </SelectableCard>
    )
}
