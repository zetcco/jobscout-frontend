import { Alert, AlertTitle, Button, Stack } from '@mui/material'
import React, { forwardRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { clearError, selectAuthError, selectAuthLoading, selectAuthSuccess, selectAuthUser, updateDisplayPicture } from '../../../features/authSlice'
import { CenteredHeaderCard } from '../../cards/CenteredHeaderCard'
import { UploadArea } from '../../input/UploadArea'

export const UploadProfilePictureForm = forwardRef(({ onUpdate, onCancel }, ref ) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const authUser = useSelector(selectAuthUser);
  const authSuccess = useSelector(selectAuthSuccess)
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (authSuccess)
      navigate(0)
  }, [authSuccess])

  useEffect(() => {
    dispatch(clearError())
  }, [])

  if(!onUpdate && authUser?.displayPicture) 
    return <Navigate to="/home"/>

  // if (onUpdate && authSuccess) {
    // dispatch(resetSuccess)
    // return <Navigate to={`/users/${authUser.id}`}/>
  // }

  const onSubmit = (data) => {
    dispatch(clearError())
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
              {
                onUpdate ? (
                  <Button variant='outlined' sx={{ width: '100%' }} onClick={onCancel}>Close</Button>
                ) : (
                  <Button variant='outlined' sx={{ width: '100%' }} onClick={() => { 
                    navigate('/home') 
                    dispatch(clearError())
                  }}>Skip</Button>
                )
              }
              <Button type="submit" variant="contained" fullWidth disabled={loading}>Continue</Button>
            </Stack>
        </Stack>
        </form>
    </CenteredHeaderCard>
    )
  })