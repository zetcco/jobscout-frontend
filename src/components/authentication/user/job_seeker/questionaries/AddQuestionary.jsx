import React, { useState } from 'react'
import { AddQuestionaryDetails } from './AddQuestionaryDetails'
import { Box, Button, Radio, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import { AddQuestion } from './AddQuestion'

export const AddQuestionary = () => {
    const [ request, setRequest ] = useState({
        data: {},
        questions: []
    })

    const [edit, setEdit] = useState(true)

    const setQuestion = (index, question) => {
        setRequest(e => {
            const questions = e.questions
            questions[index] = question
            return ({ ...e, questions })
        })
    }

    const addQuestion = () => {
        setRequest(e => ({
            ...e, questions: [...e.questions, { question: '', answers: [], correctAnswer: '', errors: [] }]
        }))
    }

    const submit = () => {
        let errorsFound = false
        let errorIndex = null
        request.questions.forEach((question, index) => {
            const errors = []
            if (question.question === '')
                errors.push('question')
            question.answers.forEach((answer, index) => {
                if (answer === '')
                    errors.push(index)
            })
            if (question.correctAnswer === '')
                errors.push('correctAnswer')
            setQuestion(index, { ...question, errors })
            if (errors.length !== 0) {
                errorsFound = true
                if (errorIndex === null)
                    errorIndex = index
            }
        });
        if (!errorsFound)
            console.log(request)
        else
            document.getElementById(`question-${errorIndex}`).scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Stack spacing={2}>
        <AddQuestionaryDetails details={request.data} setDetails={(data) => { 
            setRequest(e => ({...e, data })) 
            setEdit(false)
        }} edit={edit} setEdit={setEdit}/>
        {
            request.questions.map((question, index) => (
                <AddQuestion key={index} index={index} question={question} setQuestion={data => { setQuestion(index, data) }}/>
            ))
        }
        <Tooltip title={Object.keys(request.data).length === 0 ? "Please complete above to add questions" : "Add questions"}>
            <Box>
            <Button onClick={addQuestion} disabled={Object.keys(request.data).length === 0} fullWidth>Add Question</Button>
            </Box>
        </Tooltip>
        <Button variant='contained' onClick={submit} disabled={edit || request.questions.length === 0}>Submit</Button>
        </Stack>
    )
}
