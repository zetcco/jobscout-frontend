import { BasicCard } from 'components/cards/BasicCard';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Stack, Typography, } from '@mui/material';
import { useEffect } from 'react';
import { getReadableTime } from 'features/notificationSlice';

export const QuestionForm = ({ question, index, time, answers, setAnswers }) => {

  const disabled = time === 0

  return (
    <BasicCard>
      <FormControl fullWidth disabled={disabled}>
        <Stack direction={'column'} spacing={1}>
          <Typography fontWeight={'bold'} color={ disabled && answers[index] === -1 && 'error' }>{question.question} ({ getReadableTime(time) })</Typography>
            <RadioGroup value={answers[index]} onChange={(e) => { setAnswers(prevState => {
              const arr = prevState.slice()
              arr[index] = parseInt(e.target.value)
              return arr
            }) }}>
              <Stack direction={'column'}>
              {
                question.answers.map((answer, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={<Radio size='small' />}
                        label={answer}
                      />
                ))
              }
              </Stack>
            </RadioGroup>
        </Stack>
      </FormControl>
    </BasicCard>
  );
};