import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, SegmentedControl, Flex, createStyles, Box, Select, rem } from '@mantine/core';
import { workSubject, workTitle, workplace } from '../../db/db';
import { DateTimePicker } from '@mantine/dates';
import Substations from '../Substations/Substations';
import { useEffect, useState } from 'react';
import { addNewRecord } from '../../store/history/actions';
import { useAppDispatch } from '../../store/store';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
    margin: '10px auto',
    width: '100%',
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: 'pink', to: 'orange' }),
  },

  control: {
    border: '0 !important',
  },

  label: {
    '&, &:hover': {
      '&[data-active]': {
        color: theme.white,
      },
    },
  },
}));

function HistoryForm() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [commentValue, setCommentValue] = useState('');
  const [workSubjectValue, setWorkSubjectValue] = useState('МУРС');
  const [substationType, setSubstationType] = useState<String>('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [numberOfTP, setNumberOfTP] = useState('');
  const form = useForm({
    initialValues: {
      place: '',
      subject: '',
      title: '',
      // comment: '',
    },

    validate: {
      place: isNotEmpty(),
      title: isNotEmpty(),
      subject: isNotEmpty(),
      // comment: isNotEmpty(),
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const getFullDate = () => {
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().toISOString().slice(11, 16);
        setDateValue(date);
        setTimeValue(time);
      };
      getFullDate();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const saveData = (data: any, event: any) => {
    event.preventDefault();
    console.log(data);

    dispatch(
      addNewRecord({
        workPlaceValue: data.place,
        workSubjectValue: data.subject,
        workTitleValue: data.title,
        commentValue: commentValue + substationType + '-' + numberOfTP + ' ',
        dateValue,
        timeValue,
      }),
    );
    form.reset();
  };

  return (
    <>
      <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
        <form onSubmit={form.onSubmit(saveData)}>
          <Box>
            <SegmentedControl
              {...form.getInputProps('subject')}
              data={workSubject}
              classNames={classes}
            />
            <Select
              label="Workplace"
              {...form.getInputProps('place')}
              withAsterisk
              data={workplace}
              placeholder="Pick workplace"
              clearable
              transitionProps={{
                transition: 'pop-top-left',
                duration: 100,
                timingFunction: 'ease',
              }}
            />
            <Select
              label="Title"
              withAsterisk
              {...form.getInputProps('title')}
              data={workTitle}
              placeholder="Pick work title"
              clearable
              transitionProps={{
                transition: 'pop-top-left',
                duration: 100,
                timingFunction: 'ease',
              }}
            />
          </Box>
          <Box>
            <Substations
              substationType={substationType}
              setSubstation={setSubstationType}
              numberOfTP={numberOfTP}
              setNumberOfTP={setNumberOfTP}
              commentValue={commentValue}
              setCommentValue={setCommentValue}></Substations>
          </Box>
          <Button fullWidth size="lg" type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
}

export default HistoryForm;
