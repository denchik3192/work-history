import { useForm, isNotEmpty } from '@mantine/form';
import { serverTimestamp, addDoc, doc, collection } from 'firebase/firestore';
import {
  Button,
  SegmentedControl,
  Flex,
  createStyles,
  Box,
  Select,
  rem,
  Textarea,
  Tooltip,
  Radio,
  TextInput,
} from '@mantine/core';
import { TPType, substations, workSubject, workTitle, workplace } from '../../db/db';
import { useContext, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { TNewRecord } from '../../types/TNewRecord';
import { Context } from '../..';
import Spiner from '../Spiner/Spiner';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [searchValue, onSearchChange] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading] = useCollectionData();

  const form = useForm({
    initialValues: {
      place: `${workplace[0].value}`,
      subject: '',
      title: '',
      comment: '',
      numberOfTP: '',
      substationType: ``,
    },

    validate: {
      place: isNotEmpty(),
      title: isNotEmpty(),
      subject: isNotEmpty(),
    },
  });

  const sendData = async (data: TNewRecord, event: any) => {
    event.preventDefault();

    await addDoc(collection(firestore, 'work-history'), {
      place: data.place,
      subject: data.subject,
      title: data.title,
      comment: data.comment,
      timeValue: serverTimestamp(),
      substationType: data.substationType,
      numberOfTP: data.numberOfTP,
    });

    // dispatch(
    //   addNewRecord({
    //     place: data.place,
    //     subject: data.subject,
    //     title: data.title,
    //     comment: data.comment,
    //     dateValue,
    //     timeValue,
    //     substationType: data.substationType,
    //     numberOfTP: data.numberOfTP,
    //   }),
    // );
    form.reset();
  };

  if (loading) {
    return <Spiner />;
  }

  return (
    <>
      <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
        <form onSubmit={form.onSubmit(sendData)}>
          <Box>
            <SegmentedControl
              data={workplace}
              {...form.getInputProps('place')}
              classNames={classes}
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
            <Select
              label="Subject"
              {...form.getInputProps('subject')}
              withAsterisk
              data={workSubject}
              placeholder="Pick worksubject"
              clearable
              transitionProps={{
                transition: 'pop-top-left',
                duration: 100,
                timingFunction: 'ease',
              }}
            />
          </Box>
          <Box>
            <Select
              w={'100%'}
              label="Select substation"
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={substations}
              transitionProps={{
                transition: 'pop-top-left',
                duration: 100,
                timingFunction: 'ease',
              }}
            />

            <Radio.Group name="substation type" label="Select substation type">
              <Flex style={{ alignItems: 'center' }}>
                <SegmentedControl data={TPType} {...form.getInputProps('substationType')} />
                <span>-</span>
                <TextInput
                  style={{ flexGrow: '1' }}
                  type="number"
                  {...form.getInputProps('numberOfTP')}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  inputContainer={(children) => (
                    <Tooltip label="Enter the number" position="top-start" opened={focused}>
                      {children}
                    </Tooltip>
                  )}
                />
              </Flex>
            </Radio.Group>
            <Textarea
              placeholder="Comment"
              label="Comment"
              {...form.getInputProps('comment')}
              style={{ marginBottom: '10px', margin: '20px auto' }}
            />
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
