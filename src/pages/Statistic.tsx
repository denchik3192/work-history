import { Group, Paper, Text, Progress, Title, Badge, Card, Flex, Pagination } from '@mantine/core';
import classes from './Statistic.module.css';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { colors } from '../db/colors';
import {
  selectDatesStats,
  selectNumberOfRecords,
  selectNumberOfWorkplaceStats,
  selectTitlesStats,
  selectWorkplaceStats,
} from '../store/statistic/selectors';
import { useEffect } from 'react';
import { fetchItemsFromFireStore } from '../store/statistic/reducers';

export function Statistic() {
  const dispatch = useAppDispatch();
  const numberOfRecords = useSelector(selectNumberOfRecords);
  const workplaceStats = useSelector(selectWorkplaceStats);
  const datesStats = useSelector(selectDatesStats);
  const titleStats = useSelector(selectTitlesStats);
  const numberofWorkplace = useSelector(selectNumberOfWorkplaceStats);
  console.log(numberofWorkplace);

  useEffect(() => {
    dispatch(fetchItemsFromFireStore());
  }, []);

  const titles = titleStats.map((stat: any, idx: number) => {
    const titleName = stat[0];
    const titleCount = stat[1];
    return (
      <>
        <Group className={classes.workPlaceRow} ml={10} key={idx}>
          <Group>
            <div className={classes.dot} style={{ backgroundColor: 'white' }} />
            <Text style={{ fontSize: '0.9rem' }}>{titleName}</Text>
          </Group>
          <Text style={{ fontWeight: '700' }}>{titleCount}</Text>
        </Group>
      </>
    );
  });

  console.log(workplaceStats);

  const wpStats = numberofWorkplace.map((el: any, idx: number) => (
    <Group key={idx} className={classes.workPlaceRow} ml={10}>
      <Group>
        <div className={classes.dot} style={{ backgroundColor: `${colors[idx]}` }} />
        <div>{el[0]}</div>
      </Group>
      <Text style={{ fontWeight: '700' }}>{`${el[1]}`}</Text>
      {/* //remove numberofWorkplace[idx]*/}
    </Group>
  ));

  return (
    <div className={classes.root}>
      <Group display={'apart'}>
        <Title order={1}> Records : </Title>
        <Badge variant="dot" color="violet" size="xl" radius="sm">
          {numberOfRecords}
        </Badge>
        <Badge size="lg">{datesStats}</Badge>
      </Group>
      <Progress
        mt="md"
        mb="md"
        size="xl"
        radius="sm"
        style={{ textTransform: 'capitalize' }}
        sections={workplaceStats.map((el: any, idx: number) => ({
          value: el[1],
          color: colors[idx],
        }))}
      />

      <Card
        miw={'300px'}
        maw={'500px'}
        mr={'md'}
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        mb={15}
        bg={'transparent'}>
        <Title order={3} mb={15}>
          - Workplace -
        </Title>
        {wpStats}
      </Card>
      <Card
        shadow="sm"
        padding="md"
        maw={'500px'}
        radius="md"
        withBorder
        mb={15}
        bg={'transparent'}>
        <Title order={3} mb={15}>
          - Title -
        </Title>
        {titles}
      </Card>
    </div>
  );
}

export default Statistic;
