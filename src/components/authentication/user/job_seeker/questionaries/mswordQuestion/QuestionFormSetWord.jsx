import { BasicCard } from 'components/cards/BasicCard';
import { Button, Stack } from '@mui/material';
import { QuestionFormWord } from './QuestionFormWord';

export const QuestionFormSetWord = () => {
  const question = [
    {
      id: '1',
      question: 'What is the maximum length of a Python identifier?',
      answers: ['32', '16', '128', 'No fixed length is specified.'],
    },
    {
      id: '2',
      question:
        'What will be the output of the following code snippet? print(2**3 + (5 + 6)**(1 + 1))',
      answers: ['129', '8', '121', 'None of the above.'],
    },
    {
      id: '3',
      question: 'How is a code block indicated in Python?',
      answers: ['Brackets', 'Indentation', 'Key', 'Non of above'],
    },
    {
      id: '4',
      question: 'Which of the following concepts is not a part of Python?',
      answers: ['Pointers', 'Loop', 'Dynamic Typing', 'All of the above'],
    },
    {
      id: '5',
      question:
        'Which of the following statements are used in Exception Handling in Python?',
      answers: ['try', 'except', 'finally', 'All of the above'],
    },
  ];
  return (
    <BasicCard sx={{ width: '800px', margin: 'auto' }}>
      <Stack direction={'column'} spacing={2}>
        {question.map((question) => (
          <QuestionFormWord
            question={question.question}
            answers={question.answers}
          />
        ))}

        <Button variant='contained'>Submit</Button>
      </Stack>
    </BasicCard>
  );
};
