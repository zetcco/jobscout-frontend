import { Alert, AlertTitle, Button, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import React from 'react'

export const AddQuestion = ({ question, setQuestion, index }) => {
    return (
        <div id={"question-" + index}>
        <BasicCard error={
            question.errors.length !== 0 && (
            question.question === '' ||
            question.answers.some(answer => answer === '') ||
            question.correctAnswer === ''
            )
            }>
            <Stack spacing={1}>
                {
                    question.errors.includes('correctAnswer') && question.correctAnswer === '' && (
                        <Alert severity='error'>
                            <Typography><strong>Please select a correct answer</strong></Typography>
                        </Alert>
                    )
                }
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <Typography variant='h6'>{ index + 1 }.</Typography>
                    <TextField 
                        fullWidth
                        value={question.question}
                        onChange={e => { setQuestion({...question, question: e.target.value}) }}
                        size='small'
                        error={question.question === '' && question.errors.includes('question')}
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
                            error={ question.answers[index] === '' && question.errors.includes(index)}
                            onChange={e => { 
                                const answers = [...question.answers]
                                answers[index] = e.target.value
                                setQuestion({...question, answers })
                            }}/>
                        </Stack>
                    ))}
                    </Stack>
                    </RadioGroup>
                    <Button onClick={() => { setQuestion({...question, answers: [...question.answers, '']}) }} >Add Answer</Button>
                </Stack>
            </Stack>
        </BasicCard>
        </div>
    )
}
