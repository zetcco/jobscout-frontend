import { BasicCard } from 'components/cards/BasicCard';
import { Button, Stack } from '@mui/material';
import { QuestionFormWord } from './QuestionFormWord';

export const QuestionFormSetWord = () => {
  const question = [
    {
      id: '1',
      question: 'Microsoft word is ____ software?',
      answers: ['Application', 'Compiler', 'System', 'Programming'],
    },
    {
      id: '2',
      question:
        'Which is not in MS word?',
      answers: ['Italic', 'Magic tool', 'Bold', 'Font'],
    },
    {
      id: '3',
      question: '____ cannot be used to work in MS Office?',
      answers: ['Joystick', 'Scanner', 'Light Pen', 'Mouse'],
    },
    {
      id: '4',
      question: 'Which is not an edition of MS Word?',
      answers: ['MS Word 2003', 'MS Word 2007', 'MS Word 2010', 'MS Word 1020'],
    },
    {
      id: '5',
      question:
        'The ___ works with the standard Copy and Paste commands?',
      answers: ['View tab', 'Paragraph dialog box', 'Office Clipboard', 'All of these'],
    },
    {
      id: '6',
      question:
        'What is the blank space outside the printing area on a page?',
      answers: ['Clipart', 'Margins', 'Header', 'Footer'],
    },
    {
      id: '7',
      question:
        'Which of the following is an example of page orientation?',
      answers: ['Landscape', 'Subscript', 'Superscript', 'A4'],
    },
    {
      id: '8',
      question:
        'Formatting is performed on?',
      answers: ['Text', 'Table', 'Menu', 'Both (a) and (b)'],
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
