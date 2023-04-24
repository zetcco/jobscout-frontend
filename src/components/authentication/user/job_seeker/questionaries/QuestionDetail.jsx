import { Alert, AlertTitle, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { BasicCard } from 'components/cards/BasicCard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { selectAuthUser, serverClient } from 'features/authSlice';
import { useParams, useNavigate } from 'react-router';
import { QuestionaryAttempt } from './QuestionaryAttempt';
import { QuestionaryResults } from './QuestionaryResults';
import { useSelector } from 'react-redux';

export const QuestionDetail = () => {

  const { questionaryId } = useParams()
  const navigate = useNavigate()

  const [ details, setDetails ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  
  const [ started, setStarted ] = useState(false)
  const [ results, setResults ] = useState(null)

  const authUser = useSelector(selectAuthUser)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDetails(questionaryId)
        const attemptsRemaining = await fetchAttemptCount(questionaryId)
        setDetails({ ...data, remainingAttempts: attemptsRemaining })
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    getData()
  }, [])

  const onSubmit = (answers) => {
    const submitData = async () => {
      setStarted(false)
      setLoading(true)
      try {
        const data = await submitAnswers(questionaryId, answers)
        setResults(data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    submitData()
  }

  if (loading)
    return (
      <BasicCard>
        <CircularProgress/>
      </BasicCard>
    )
  if (started === false && results !== null) {
    return ( <QuestionaryResults results={results} id={questionaryId}/> )
  }
  
  if (started) {
    return (<QuestionaryAttempt timePerQuestion={details.timePerQuestion} questions={details.questions} onSubmit={onSubmit}/>)
  }

  return (
    <BasicCard sx={{width: '100%'}}>
      {
        error !== null ? (
          <>
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            <strong>{error.response.data.message}</strong>
          </Alert>
          </>
        ) : (
          <>
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack spacing={1}>
                  {
                    details.badge !== null && (
                      <img style={{ width: 60, height: 60 }} src={details.badge} />
                    )
                  }
                <Typography variant='h6_bold'>{ details.name }</Typography>
                <Typography>{ details.description }</Typography>
              </Stack>
              <Box>
                <Button onClick={() => { navigate(`/questionaries/${questionaryId}/edit`) }}>Edit</Button>
              </Box>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <FormatListBulletedIcon />
                <p><b>{ details.questions.length }</b> multiple choice question</p>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <ScheduleIcon />
                <p><b>{details.timePerQuestion / 1000 / 60 } min</b> per question</p>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <EventAvailableIcon />
                <p>Score at least <b>70%</b> to earn a badge</p>
            </Stack>
            <Divider variant="middle" />
          </Stack>
          <Stack spacing={1}>
            <Typography fontWeight={'bold'} mt={2}>Before you start</Typography>
            <ul>
                <li>You must complete this assesment in one session-make sure your internet is reliable.</li>
                <li>You can retake this assesment only <b>{ details.remainingAttempts } times</b>.</li>
                <li>We won't show your result to anyone without your permission.</li>
            </ul>
            <Divider variant="middle" />
          </Stack>
          <p>Language: <b>English</b></p>
          <Button variant='contained' fullWidth onClick={() => { setStarted(true) }} disabled={ details.remainingAttempts === 0 }>{ details.remainingAttempts === 0 ? 'You are not eligible' : 'Continue' }</Button>
          </>
        )
      }
    </BasicCard>
  );
};

const fetchDetails = async (id) => {
  const response = await serverClient.get(`/questionary/${id}`)
  return response.data
}

const submitAnswers = async (id, answers) => {
  const response = await serverClient.post(`/questionary/${id}/check`, { answers })
  return response.data
}

const fetchAttemptCount = async (id) => {
  const response = await serverClient.get(`/questionary/${id}/remaining-attempts`)
  return response.data
}