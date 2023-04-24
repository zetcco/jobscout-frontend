import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Alert, AlertTitle, Button, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export const AddQuestion = forwardRef(({ initQuesiton }, ref) => {

    const [ question, setQuestion ] = useState(initQuesiton)
    const [ errors, setErrors ] = useState([])
    const [ removed, setRemoved ] = useState(false)
    const elRef = useRef(null)

    useImperativeHandle(ref, () => ({
        isRemoved: () => {
            return removed
        },
        getQuestion: () => {
            return question
        },
        setErrors: (errors) => {
            setErrors(errors)
        },
        getRef: () => {
            return elRef
        }
    }))

    if (removed)
        return null

    return (
        <BasicCard error={
            errors.length !== 0 && (
            question.question === '' ||
            question.answers.some(answer => answer === '') ||
            question.correctAnswer === ''
            ) }
            ref={elRef}
            onClose={() => { setRemoved(true) }}
            >
            <Stack spacing={1}>
                {
                    errors.includes('correctAnswer') && question.correctAnswer === '' && (
                        <Alert severity='error'>
                            <Typography><strong>Please select a correct answer</strong></Typography>
                        </Alert>
                    )
                }
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <TextField 
                        fullWidth
                        value={question.question}
                        onChange={e => { setQuestion({...question, question: e.target.value}) }}
                        size='small'
                        error={question.question === '' && errors.includes('question')}
                        required
                    />
                </Stack>
                <Stack spacing={1}>
                    <RadioGroup
                        value={question.correctAnswer}
                        onChange={e => setQuestion({ ...question, correctAnswer: e.target.value })}
                    >
                    <Stack spacing={1}>
                    { 
                    question.answers.map((answer, index) => (
                        <Stack direction={'row'} key={index}>
                            <FormControlLabel value={index} control={ <Radio  />}/>
                            <TextField fullWidth value={question.answers[index]}
                            size='small'
                            error={ question.answers[index] === '' && errors.includes(index)}
                            onChange={e => { 
                                const answers = [...question.answers]
                                answers[index] = e.target.value
                                setQuestion({...question, answers })
                            }}/>
                            <IconButton onClick={() => { setQuestion(q => ({...q, answers: q.answers.filter((_, i) => i !== index)})) }}>
                                <RemoveCircleOutline color='error'/>
                            </IconButton>
                        </Stack>
                    ))}
                    </Stack>
                    </RadioGroup>
                </Stack>
                <Button onClick={() => { setQuestion({...question, answers: [...question.answers, '']}) }} >
                    <AddCircleOutline/>
                </Button>
            </Stack>
        </BasicCard>
    )
})
