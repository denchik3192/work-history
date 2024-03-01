import { useForm, isNotEmpty } from '@mantine/form';
import {
  Button,
  Flex,
  Select,
  Textarea,
  Tooltip,
  Radio,
  TextInput,
  MediaQuery,
} from '@mantine/core';
import { TPType, substations, workSubject, workTitle, workplace } from '../../db/db';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { TNewRecord } from '../../types/TNewRecord';
import Spiner from '../Spiner/Spiner';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { addItem } from '../../store/history/reducers';

function HistoryForm() {
  const dispatch = useAppDispatch();
  const [focused, setFocused] = useState<boolean>(false);
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

  const sendData = async (data: TNewRecord, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addItem(data));
    notifications.show({
      icon: <IconCheck />,
      color: 'teal',
      title: 'Success',
      message: 'Your record is sucsessfully added!',
      autoClose: 1500,
    });
    form.reset();
  };

  if (loading) {
    return <Spiner />;
  }

  return (
    <>
      <Flex gap="md" justify="space-evenly" align="center" wrap="wrap">
        <form onSubmit={form.onSubmit(sendData)}>
          <Select
            label="Place"
            withAsterisk
            {...form.getInputProps('place')}
            data={workplace}
            placeholder="Pick work place"
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

          <Radio.Group name="substation type">
            <Flex style={{ alignItems: 'center' }}>
              <Select
                pr={'sm'}
                label="Select substation type"
                data={TPType}
                {...form.getInputProps('substationType')}
              />
              <TextInput
                label="№"
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
          <MediaQuery smallerThan={'sm'} styles={{ marginBottom: 'auto' }}>
            <Button type="submit" fullWidth size="lg">
              Submit
            </Button>
          </MediaQuery>
        </form>
      </Flex>
    </>
  );
}

export default HistoryForm;
