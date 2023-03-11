import { BasicCard } from 'components/cards/BasicCard';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';

export const QuestionForm = () => {
  return (
    <BasicCard>
      <FormControl>
        <FormLabel id='q1'>
          {' '}
          What is the difference between list and tuples in Python?
        </FormLabel>
        <RadioGroup aria-labelledby='q1' name='radio-buttons-group'>
          <FormControlLabel
            value='female'
            control={<Radio size='small' />}
            label='Female'
          />
          <FormControlLabel
            value='male'
            control={<Radio size='small' />}
            label='Male'
          />
          <FormControlLabel
            value='other'
            control={<Radio size='small' />}
            label='Other'
          />
        </RadioGroup>
      </FormControl>
    </BasicCard>
  );
};
