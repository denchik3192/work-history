import { Group, Paper, Text, Progress, Title, Badge } from '@mantine/core';
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
  //  selectWorkSubjectStats
} from '../store/statistic/selectors';

export function Statistic() {
  const numberOfRecords = useSelector((state: RootState) => state.history.items.length);
  // const subjects = useSelector(selectWorkSubjectStats);
  const workplaceStats = useSelector(selectWorkplaceStats);
  const datesStats = useSelector(selectDatesStats);
  const titleStats = useSelector(selectTitlesStats);
  const numberofWorkplaceStats = useSelector(selectNumberOfWorkplaceStats);
  const numberofWorkplace = Object.values(numberofWorkplaceStats);

  // const stats = Object.entries(subjects).map((stat: any) => {
  //   return (
  //     <>
  //       <Paper withBorder p="md" radius="md" key={stat.title} miw={150}>
  //         <Group style={{ justifyContent: 'space-between' }}>
  //           <Text size="l" c="dimmed" className={classes.title}>
  //             {stat[0]}
  //           </Text>
  //           <IconSquareRoundedChevronsDownFilled />
  //         </Group>

  //         <Group align="flex-end" mt={25}>
  //           <Text className={classes.value}>{stat[1]}</Text>
  //         </Group>

  //         <Text fz="xs" c="dimmed" mt={7}>
  //           Records
  //         </Text>
  //       </Paper>
  //     </>
  //   );
  // });

  const titles = Object.entries(titleStats).map((stat: any) => {
    return (
      <>
        <Paper withBorder p="md" radius="md" key={stat.title} miw={150}>
          <Group style={{ justifyContent: 'space-between' }}>
            <Text size="l" c="dimmed" className={classes.title}>
              {stat[0]}
            </Text>
            <IconSquareRoundedChevronsDownFilled />
          </Group>

          <Group align="flex-end" mt={25}>
            <Text className={classes.value}>{stat[1]} Records</Text>
          </Group>
        </Paper>
      </>
    );
  });

  return (
    <div className={classes.root}>
      <Group>
        <Title order={1}> Number of records :</Title>
        <Badge variant="dot" color="violet" size="xl" radius="sm">
          {numberOfRecords}
        </Badge>
        <Text>({datesStats})</Text>
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
          label: `${el[0]} - ${numberofWorkplace[idx]}`,
        }))}
      />
      {/* <Group>{stats}</Group> */}

      <Group mt={15}>{titles}</Group>
    </div>
  );
}

export default Statistic;
