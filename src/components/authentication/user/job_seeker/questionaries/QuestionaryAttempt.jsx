import { Box, Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { QuestionForm } from './QuestionForm'
import { ArrowBackIosNewSharp, ArrowForwardIosOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { serverClient } from 'features/authSlice'

const openedQuestions = []

export const QuestionaryAttempt = ({ questions, timePerQuestion, onSubmit }) => {

    const [ selectedQuestion, setSelectedQuestion ] = useState(null)
    const [ answers, setAnswers ] = useState(Array.from({length: questions.length}, (_) => null))
    const [ disabledAnswers, setDisabledAnswers ] = useState([])
    const [ results, setResults ] = useState(null)
    const [ timeLeft, setTimeLeft ] = useState(Array.from({length: questions.length}, (_) => timePerQuestion))

    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            openedQuestions.length = 0
        }
    }, [])

    if (!openedQuestions.includes(selectedQuestion) && selectedQuestion !== null) {
        const interval = setInterval(() => {
            setTimeLeft(prevState => {
                const arr = prevState.slice()
                arr[selectedQuestion] -= 1000
                return arr
            })
        }, 1000)
        setTimeout(() => { 
            // setDisabledAnswers(prevState => [...prevState, selectedQuestion]) 
            clearInterval(interval)
            setAnswers(prevState => {
                const arr = prevState.slice()
                if (arr[selectedQuestion] === null)
                    arr[selectedQuestion] = -1
                return arr
            })
        }, timePerQuestion)
        openedQuestions.push(selectedQuestion)
    }

    console.log(timeLeft)

    if (selectedQuestion === null)
        return (
            <Stack sx={{ width: '100%' }} justifyContent={'center'} spacing={2}>
                <Typography align={'center'} fontWeight={'bold'}>Are you sure you want to start? </Typography>
                <Stack direction={'row'} spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
                    <Button onClick={() => { navigate('/questionaries') }} variant='outlined'>Cancel</Button>
                    <Button onClick={() => { setSelectedQuestion(0) }} variant='contained'>Start</Button>
                </Stack>
            </Stack>
        )

    return (
        <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                { questions.map((_, index) => ( 
                    <Box key={index} sx={{ width: 40, height: 40 }}>
                        <Box
                            sx= {{ position: 'relative' }}
                        >
                            <CircularProgress variant='determinate' value={( ( timePerQuestion - timeLeft[index] ) / timePerQuestion) * 100} sx={{ top: 0, left: 0, position: 'absolute' }} color={  timeLeft[index] === 0 && answers[index] === -1 ? 'error' : 'primary'  }/>
                            <Button 
                            sx={{ width: 40, height: 40, aspectRatio: '1/1', minWidth: 0, position: 'absolute', top: 0, left: 0 }}
                            variant={ selectedQuestion === index ? 'contained' : 'outlined' }
                            onClick={() => { setSelectedQuestion(index) }}
                            color={ timeLeft[index] === 0 && answers[index] === -1 ? 'error' : 'primary' }
                            >
                                <Typography sx={{ m: 2 }}>{index+1}</Typography>
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Stack>
            <QuestionForm question={questions[selectedQuestion]} index={selectedQuestion} answers={answers} setAnswers={setAnswers} time={ timeLeft[selectedQuestion] }  />
            <Stack direction={'row'} sx={{ width: '100%' }} justifyContent={'space-between'}>
                <Button startIcon={ <ArrowBackIosNewSharp/> } onClick={() => { setSelectedQuestion(prevState => prevState-1) }} disabled={ selectedQuestion === 0 }>
                    Previous
                </Button>
                <Button endIcon={ <ArrowForwardIosOutlined/> } onClick={() => { setSelectedQuestion(prevState => prevState+1) }} disabled={ selectedQuestion === questions.length -1 }>
                    Next
                </Button>
            </Stack>
            <Button sx={{ width: '100%' }} variant='contained' disabled={ answers.includes(null) } onClick={() => { onSubmit(answers) }}>Submit</Button>
      </Stack>
    )
}
