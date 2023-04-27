import React, { createRef, useState } from 'react'
import { AddQuestionaryDetails } from './AddQuestionaryDetails'
import { Alert, Box, Button, Stack, Tooltip } from '@mui/material'
import { AddQuestion } from './AddQuestion'
import { serverClient } from 'features/authSlice'
import { useNavigate } from 'react-router-dom'

export const AddQuestionary = ({ initRequest, initQuestionRefs, initEdit }) => {
    const [ request, setRequest ] = useState(initRequest)
    const [ questionRefs, setQuestionRefs ] = useState(initQuestionRefs)
    const [edit, setEdit] = useState(initEdit)
    const navigate = useNavigate()
    const [ questionCountError, setQuestionCountError ] = useState(null)

    const submit = async () => {
        const questions = []
        questionRefs.forEach((question, index) => {
            if (!question.ref.current.isRemoved())
                questions.push({ question: question.ref.current.getQuestion(), ref: question.ref})
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
        if (questions.length < 20) {
            setQuestionCountError(`Please add at least ${20 - questions.length} more question(s).`)
            setTimeout(() => { setQuestionCountError(null) }, 3000)
            return
        }
        if (!errorsFound) {
            const data = {request: {...request.request, questions: questions.map(question => question.question)}, file: request.file}
            data.request.timePerQuestion = data.request.timePerQuestion * 1000
            console.log(data)
            const formData = new FormData()
            formData.append('data', new Blob([JSON.stringify(data.request)], { type: "application/json" }));
            if (data.file)
                formData.append('file', data.file[0]);
            let response;
            if (Object.keys(initRequest).length === 0) {
                response = await serverClient.post('/questionary/create', formData)
            } else 
                response = await serverClient.put(`/questionary/${initRequest.request.id}/update`, formData)
            if (response.status === 200)
                navigate(`/questionaries/${response.data.id}`)
        } else
            questions[errorIndex].ref.current.getRef().current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return (
        <Stack spacing={2}>
        <AddQuestionaryDetails initDetails={request} setDetails={(data) => { 
            setRequest(e => ({...e, ...data })) 
            setEdit(false)
        }} edit={edit} setEdit={setEdit}/>
        {
            questionRefs.map((question, index) => (
                <AddQuestion ref={question.ref} key={index} index={index} onRemove={(index) => { setQuestionRefs(ref => ref.filter((_, qIndex) => qIndex !== index)) }} initQuesiton={question.init}/>
            ))
        }
        <Tooltip title={Object.keys(request).length === 0 ? "Please complete above to add questions" : "Add questions"}>
            <Box>
            <Button onClick={() => { setQuestionRefs(refs => [...refs, { init: { id: null, question: '', answers: [], correctAnswer: '' }, ref: createRef() } ]) }} disabled={Object.keys(request).length === 0} fullWidth>Add Question</Button>
            </Box>
        </Tooltip>
        {
            questionCountError && (
                <Alert severity='error'>
                    <strong>{questionCountError}</strong>
                </Alert>
            )
        }
        <Button variant='contained' onClick={submit} disabled={edit || questionRefs.length === 0 }>Submit</Button>
        </Stack>
    )
}

AddQuestionary.defaultProps = {
    initRequest: {},
    initQuestionRefs: [], 
    initEdit: true
}
