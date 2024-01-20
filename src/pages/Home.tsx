import React, { useContext, useEffect, useState } from 'react';
import { Title, Group, Indicator, Flex } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import Time from '../components/Time/Time';
import { useAppDispatch } from '../store/store';
import { addItems } from '../store/history/actions';
import HistoryForm from '../components/HistoryForm/HistoryForm';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Context } from '..';
import Template from '../components/Template/Template';

const Home: React.FC = () => {

  console.log('home render');
  return (
    <>
      <Title order={1}>New record</Title>
      <Group>
        <HistoryForm />
        <Flex direction={'column'} style={{ alignSelf: 'flex-start' }} align="center">
          <Time></Time>
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
        </Flex>
        <Template />
      </Group>
    </>
  );
};

export default Home;
