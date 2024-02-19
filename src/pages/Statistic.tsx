import { Group, Paper, Text, Progress, Title, Badge, Card, Flex } from '@mantine/core';
import { IconSquareRoundedChevronsDownFilled } from '@tabler/icons-react';
import classes from './Statistic.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectWorkplaceStats } from '../store/sortHistoryBy/selectors';
import { colors } from '../db/colors';
import {
  selectDatesStats,
  selectNumberOfWorkplaceStats,
  selectTitlesStats,
} from '../store/statistic/selectors';

export function Statistic() {
  const numberOfRecords = useSelector((state: RootState) => state.history.items.length);

  const workplaceStats = useSelector(selectWorkplaceStats);
  const datesStats = useSelector(selectDatesStats);
  const titleStats = useSelector(selectTitlesStats);
  const numberofWorkplaceStats = useSelector(selectNumberOfWorkplaceStats);
  const numberofWorkplace = Object.values(numberofWorkplaceStats);

  const titles = Object.entries(titleStats).map((stat: any, idx: number) => {
    return (
      <>
        <Group className={classes.workPlaceRow} ml={10} key={idx}>
          <Group>
            <div className={classes.dot} style={{ backgroundColor: 'white' }} />
            <Text style={{ fontSize: '0.9rem' }}>{stat[0]}</Text>
          </Group>
          <Text style={{ fontWeight: '700' }}>{`${numberofWorkplace[idx]}`}</Text>
        </Group>
      </>
    );
  });

  const wpStats = Object.entries(workplaceStats).map((el: any, idx: number) => (
    <Group className={classes.workPlaceRow} ml={10} key={idx}>
      <Group>
        <div className={classes.dot} style={{ backgroundColor: `${colors[idx]}` }} />
        <div>{el[0]}</div>
      </Group>
      <Text style={{ fontWeight: '700' }}>{`${numberofWorkplace[idx]}`}</Text>
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
        sections={Object.entries(workplaceStats).map((el: any, idx: number) => ({
          value: el[1],
          color: colors[idx],
        }))}
      />

      <Flex>
        {' '}
        <Card
          miw={'300px'}
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
          maw={'400px'}
          radius="md"
          withBorder
          mb={15}
          bg={'transparent'}>
          <Title order={3} mb={15}>
            - Title -
          </Title>
          {titles}
        </Card>
      </Flex>
    </div>
  );
}

export default Statistic;
