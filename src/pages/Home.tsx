import React from 'react';
import { Title, Group, Indicator, Flex, MediaQuery } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import Time from '../components/Time/Time';
import HistoryForm from '../components/HistoryForm/HistoryForm';

const Home: React.FC = () => {
  return (
    <>
      <Group position="apart" pb={'sm'} style={{ fontStyle: 'italic' }} maw={580}>
        <Title order={2} style={{ alignSelf: 'start', textTransform: 'uppercase' }}>
          New record
        </Title>
        <Time></Time>
      </Group>

      <Group>
        <HistoryForm />
        <Flex direction={'column'} style={{ alignSelf: 'flex-start' }} align="center">
          <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
            <Calendar
              static
              renderDay={(date) => {
                const day = date.getDate();
                const today = new Date().toISOString().slice(8, 10);
                return (
                  <Indicator size={8} color="#09B8FF" offset={-2} disabled={day !== +today}>
                    <div>{day}</div>
                  </Indicator>
                );
              }}
            />
          </MediaQuery>
        </Flex>
      </Group>
    </>
  );
};

export default Home;
