import { QuestionForm } from './QuestionForm';
import { BasicCard } from 'components/cards/BasicCard';
import { Button, Stack } from '@mui/material';

export const QuestionFormSet = () => {
  return (
    <BasicCard>
      <Stack direction={'column'} spacing={2}>
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <QuestionForm />
        <Button variant='contained'>Submit</Button>
      </Stack>
    </BasicCard>
  );
};
