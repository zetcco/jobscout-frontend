import { Alert, AlertTitle, Button, Stack } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuthError, selectAuthLoading, selectAuthUser, updateDisplayPicture } from '../../../features/authSlice'
import { CenteredHeaderCard } from '../../cards/CenteredHeaderCard'
import { UploadArea } from '../../input/UploadArea'

export const UploadProfilePictureForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const authUser = useSelector(selectAuthUser);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  if(authUser?.displayPicture) 
    return <Navigate to="/home"/>

  const onSubmit = (data) => {
    dispatch(updateDisplayPicture(data))
  }

  return (
    <CenteredHeaderCard title={"Create your Profile"} >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
            {
                authError && 
                (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>{authError.message}</strong>
                    </Alert>
                )
            }
            <UploadArea 
                register={ register( "file") } 
                text={"Click here to Upload Profile Picture"}
                error={errors.file}
                files={watch("file")}
            />
            <Stack spacing={2} direction="row">
              <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
              <Button type="submit" variant="contained" fullWidth disabled={loading}>Continue</Button>
            </Stack>
        </Stack>
        </form>
    </CenteredHeaderCard>
    )
  }