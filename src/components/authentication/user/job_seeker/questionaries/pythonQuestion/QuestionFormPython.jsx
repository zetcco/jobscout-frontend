import { BasicCard } from 'components/cards/BasicCard';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stack,
} from '@mui/material';

export const QuestionFormPython = ({ question, answers }) => {
  return (
    <BasicCard sx={{ width: '735px' }}>
      <FormControl>
        <FormLabel id='q1'>{question}</FormLabel>
        <RadioGroup aria-labelledby='q1' name='radio-buttons-group'>
          <Stack direction={'row'} spacing={7}>
            {answers.map((ans) => (
              <FormControlLabel
                value='female'
                control={<Radio size='small' />}
                label={ans}
              />
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
    </BasicCard>
  );
};
