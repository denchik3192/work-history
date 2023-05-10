import { Box, Button, Flex, Group, MultiSelect, Radio, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { workTitle, workplace } from '../db/db';
import { DateTimePicker } from '@mantine/dates';
import { IconCheck } from '@tabler/icons-react';
import { createStyles, SegmentedControl, rem } from '@mantine/core';
import { Calendar } from '@mantine/dates';

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
    // marginBottom: '10px',
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

const Home: React.FC = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState('react');

  return (
    <Box w={'100%'} style={{ margin: '70px 20px 20px 20px' }}>
      <Group>
        <Calendar />
      </Group>

      <Group position="apart">
        <form>
          <Box>
            <SegmentedControl
              radius="0"
              maw={500}
              data={['МУРС', 'Диполь', 'ТМ-2000', 'DMS', 'MDB', 'OPC']}
              classNames={classes}
            />
            <MultiSelect
              maw={500}
              data={workplace}
              placeholder="Pick all workplace"
              clearable
              style={{ marginBottom: '10px', margin: '20px auto' }}
            />
            <MultiSelect
              data={workTitle}
              maw={500}
              placeholder="Pick work title"
              clearable
              style={{ marginBottom: '10px', margin: '20px auto' }}
            />
            <DateTimePicker placeholder="Pick date and time" maw={600} mx="auto" clearable />
          </Box>
          <Box w={'100%'}>
            <Radio.Group
              value={value}
              onChange={setValue}
              name="substation type"
              label="Select substation type"
              // description="This is anonymous"
              // withAsterisk
            >
              <Flex>
                {' '}
                <Radio value="ТП" label="ТП" color="indigo" />
                <Radio value="КТП" label="КТП" color="indigo" />
                <Radio value="ЗТП" label="ЗТП" color="indigo" />
                <Radio value="МТП" label="МТП" color="indigo" />
              </Flex>
            </Radio.Group>
            <Textarea
              placeholder="Comment"
              label="Comment"
              withAsterisk
              style={{ marginBottom: '10px', margin: '20px auto' }}
            />
          </Box>
        </form>
      </Group>

      <Group position="center">
        <Button
          w={'100%'}
          // disabled
          onClick={() => {
            notifications.show({
              id: 'load-data',
              loading: true,
              title: 'Loading your data',
              message: 'Data will be loaded in 1 seconds, you cannot close this yet',
              autoClose: false,
              withCloseButton: false,
            });

            setTimeout(() => {
              notifications.update({
                id: 'load-data',
                color: 'teal',
                title: 'Data was loaded',
                message:
                  'Notification will close in 1 seconds, you can close this notification now',
                icon: <IconCheck size="1rem" />,
                autoClose: 1000,
              });
            }, 1500);
          }}>
          Apply
        </Button>
      </Group>
      {/* <Group position="center" my="xl">
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}>
            {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
          </ActionIcon>
        </Group> */}
      {/* <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
        <div className="buttons">
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={(e) => getAllUsers(e)}>Получать</button>
        </div> */}
    </Box>
  );
};

export default Home;
