import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { BasicCard } from 'components/cards/BasicCard';

export const QuestionFormWord = ({ question, answers }) => {
  return (
    <BasicCard sx={{ width: '735px' }}>
      <FormControl>
        <FormLabel id='q1'>{question}</FormLabel>
        <RadioGroup aria-labelledby='q1' name='radio-buttons-group'>
          <Stack direction={'row'} spacing={7}>
            {answers.map((ans) => (
              <FormControlLabel
                value=''
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
