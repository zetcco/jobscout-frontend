import { Button, Stack, TextField, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import { UploadArea } from 'components/input/UploadArea'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export const AddQuestionaryDetails = ({ edit, setEdit, setDetails, initDetails }) => {

    const { register, control, handleSubmit, formState: { errors }, watch} = useForm({
        defaultValues: { 
            request: {
                name: initDetails.request?.name,
                attemptCount: initDetails.request?.attemptCount,
                description: initDetails.request?.description,
                timePerQuestion: initDetails.request?.timePerQuestion
            }
        }});

    return (
        <BasicCard>
            <form onSubmit={ handleSubmit(setDetails) } encType="multipart/form-data" >
            <Stack spacing={1}>
                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                    <Typography variant='h6_bold'>Questionary Details</Typography>
                    <Button variant='outlined' disabled={edit} onClick={() => { setEdit(!edit) }}>Edit</Button>
                </Stack>
                <Controller
                    name="request.name"
                    control={control}
                    rules={ { required: true } }
                    defaultValue=""
                    render={ ({field}) =>(
                    <TextField 
                        {...field}
                        label="Questionary Name" 
                        variant="outlined"
                        fullWidth 
                        error={errors.request?.name && true}
                        disabled={!edit}
                        />)}
                />
                <Controller
                    name="request.description"
                    control={control}
                    rules={ { required: true } }
                    defaultValue=""
                    render={ ({field}) =>(
                    <TextField
                        {...field}
                        label='Description'
                        placeholder='Enter the Description'
                        multiline
                        minRows={3}
                        maxRows={6}
                        inputProps={{ maxLength: 256 }}
                        error={errors.request?.description && true}
                        disabled={!edit}
                    />
                    )}
                />
                <Stack direction={'row'} spacing={1}>
                    <Controller
                        name="request.timePerQuestion"
                        control={control}
                        rules={ { required: true } }
                        defaultValue=""
                        render={ ({field}) =>(
                        <TextField 
                            {...field}
                            label="Time per Question (in Seconds)" 
                            variant="outlined"
                            type='number'
                            disabled={!edit}
                            fullWidth 
                            error={errors.request?.timePerQuestion && true}
                            />)}
                    />
                    <Controller
                        name="request.attemptCount"
                        control={control}
                        rules={ { required: true } }
                        defaultValue=""
                        render={ ({field}) =>(
                        <TextField 
                            {...field}
                            label="Number of attempts" 
                            disabled={!edit}
                            variant="outlined"
                            fullWidth 
                            type='number'
                            error={errors.request?.attemptCount && true}
                            />)}
                    />
                </Stack>
                <UploadArea 
                    showPreview
                    src={initDetails.request?.badge}
                    disabled={!edit}
                    register={
                        register(
                            "file",
                            { required: initDetails ? false : true }
                        )} 
                    text={"Click here to Upload Badge"}
                    error={errors.file}
                    files={watch("file")}
                />
                {
                    edit &&
                    <Stack direction={'row'} justifyContent={'end'} spacing={1}>
                        <Button variant='contained' type='submit'>Save</Button>
                    </Stack>
                }
            </Stack>
            </form>
        </BasicCard>
    )
}
