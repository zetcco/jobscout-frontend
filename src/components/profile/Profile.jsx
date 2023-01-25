import React from 'react'
import { BasicCard } from '../BasicCard'
import { Stack } from '@mui/system'
import { Box, Grid, IconButton, Popover } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export const Profile = ({profile , profileActionButtons , profileRouteButtons , content}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <BasicCard>
            <Stack direction={'column'} spacing={4}>
                <Stack direction={{ ...( profileActionButtons ? { xs: 'column', md: 'row' } : { xs: 'row' } ) }} justifyContent={'space-between'} alignItems={ !profileActionButtons ? "center" : undefined } spacing={2}>
                    { profile }
                    {
                        profileActionButtons && 
                        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                            <Stack spacing={2} direction="row">
                                {profileActionButtons} 
                            </Stack>
                            <Box display={{ xs: 'block', md: 'none' }}>
                                <IconButton variant="contained" size="large" aria-describedby={id} onClick={handleClick}>
                                    <MenuIcon/>
                                </IconButton>
                            </Box>
                        </Stack>
                    }

                    {
                        !profileActionButtons && (
                            <Box display={{ xs: 'block', md: 'none' }}>
                                <IconButton variant="contained" size="large" aria-describedby={id} onClick={handleClick}>
                                    <MenuIcon/>
                                </IconButton>
                            </Box>
                        )
                    }

                    {/* This is the Popover component of the filters on smaller screens  */}
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                        <BasicCard>
                            <Stack direction={"column"} spacing={2}>                           
                                {profileRouteButtons} 
                            </Stack>
                        </BasicCard>
                    </Popover>

                </Stack>
                <Box display={{ xs: "none", md: "block" }}><Stack direction = {'row'} spacing={1}>{ profileRouteButtons }</Stack></Box>
                <Stack direction = {'column'} spacing = {4}>{ content }</Stack>
            </Stack>
        </BasicCard>
  )
} 
