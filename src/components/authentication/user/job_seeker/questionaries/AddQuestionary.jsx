import React, { createRef, useRef, useState } from 'react'
import { AddQuestionaryDetails } from './AddQuestionaryDetails'
import { Box, Button, Radio, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { BasicCard } from 'components/cards/BasicCard'
import { AddQuestion } from './AddQuestion'
import { serverClient } from 'features/authSlice'
import { useNavigate } from 'react-router-dom'

export const AddQuestionary = () => {
    const [ request, setRequest ] = useState({})
    const [ questionsRef, setQuestionsRef ] = useState([])
    const [edit, setEdit] = useState(true)
    const navigate = useNavigate()

    const submit = async () => {
        const questions = []
        questionsRef.forEach((ref, index) => {
            if (!ref.current.isRemoved())
                questions.push({ question: ref.current.getQuestion(), ref})
        });
        let errorsFound = false
        let errorIndex = null

        questions.forEach((question, index) => {
            const errors = []
            if (question.question.question === '')
                errors.push('question')
            question.question.answers.forEach((answer, index) => {
                if (answer === '')
                    errors.push(index)
            })
            if (question.question.correctAnswer === '')
                errors.push('correctAnswer')

            question.ref.current.setErrors(errors)

            if (errors.length !== 0) {
                errorsFound = true
                if (errorIndex === null)
                    errorIndex = index
            }
        });
        if (!errorsFound) {
            const data = {request: {...request.request, questions: questions.map(question => question.question)}, file: request.file}
            data.request.timePerQuestion = data.request.timePerQuestion * 1000
            const formData = new FormData()
            formData.append('data', new Blob([JSON.stringify(data.request)], { type: "application/json" }));
            formData.append('file', data.file[0]);
            const response = await serverClient.post('/questionary/create', formData)
            if (response.status === 200)
                navigate(`/questionaries/${response.data.id}`)
        } else
            questions[errorIndex].ref.current.getRef().current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return (
        <Stack spacing={2}>
        <AddQuestionaryDetails details={request} setDetails={(data) => { 
            setRequest(e => ({...e, ...data })) 
            setEdit(false)
        }} edit={edit} setEdit={setEdit}/>
        {
            questionsRef.map((_, index) => (
                <AddQuestion ref={questionsRef[index]} key={index} index={index} onRemove={(index) => { setQuestionsRef(ref => ref.filter((_, qIndex) => qIndex !== index)) }}/>
            ))
        }
        <Tooltip title={Object.keys(request).length === 0 ? "Please complete above to add questions" : "Add questions"}>
            <Box>
            <Button onClick={() => { setQuestionsRef(refs => [...refs, createRef() ]) }} disabled={Object.keys(request).length === 0} fullWidth>Add Question</Button>
            </Box>
        </Tooltip>
        <Button variant='contained' onClick={submit} disabled={edit || questionsRef.length === 0 }>Submit</Button>
        </Stack>
    )
}
