import { Alert, AlertTitle, Button, Stack } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { serverClient } from '../../../features/authSlice'
import { CenteredHeaderCard } from '../../cards/CenteredHeaderCard'
import { UploadArea } from '../../input/UploadArea'

export const UploadIntroVideoForm = forwardRef(({ onUpdate, onCancel }, ref ) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const onSubmit = async (data) => {
        try {
            setLoading(true)
            var formData = new FormData()
            formData.append('file', data.file[0]);
            await validate(data.file[0])
            const response = await serverClient.put(`/job-seeker/update/intro-video`, formData);
            onUpdate(response.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return (
    <CenteredHeaderCard title={"Add your Intro Video"} >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
            {
                error && 
                (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>{error.message}</strong>
                    </Alert>
                )
            }
            <UploadArea 
                register={ register( "file") } 
                text={"Click here to upload your Intro Video"}
                error={errors.file}
                files={watch("file")}
                accept={'.mp4'}
            />
            <Stack spacing={2} direction="row">
              {
                onUpdate ? (
                  <Button variant='outlined' sx={{ width: '100%' }} onClick={onCancel}>Close</Button>
                ) : (
                  <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
                )
              }
              <Button type="submit" variant="contained" fullWidth disabled={loading}>Continue</Button>
            </Stack>
        </Stack>
        </form>
    </CenteredHeaderCard>
    )
  })

const validate = async (file) => {
    if (file.size >= 52428800)
        throw new Error("File size too large (Video size must be less than 50mb)")
    const duration = await getDuration(file)
    if (duration > 120)
        throw new Error("Video duration must not exceed 2 minutes duration")
}

const getDuration = (file) => {
    return new Promise(( resolve, reject ) => {
        let video = document.createElement('video')
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration)
        }
        video.src = URL.createObjectURL(file)
    })
}