import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Select,
  SegmentedControl,
  Pagination,
  Progress,
  RingProgress,
  Text,
} from '@mantine/core';
import { setSortBy } from '../../store/settings/actions';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface TableReviewsProps {
  data: {
    id: number;
    date: String;
    place: String;
    title: String;
    subject: String;
    descr: String;
  }[];
}

export function TableReviews({ data }: TableReviewsProps) {
  const dispatch = useAppDispatch();
  const sortBy = useSelector((state: any) => state.settings.dashboardSettings.sortBy);

  console.log(sortBy);

  const rows = data.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.date}</td>
        <td>{row.place}</td>
        <td>{row.title}</td>
        <td>{row.subject}</td>
        <td>{row.descr}</td>
      </tr>
    );
  });

  return (
    <>
      <ScrollArea style={{ width: '100%', marginTop: '0px' }}>
        <RingProgress
          sections={[{ value: 3, color: 'teal' }]}
          label={
            <Text color="blue" weight={500} align="center" size="l">
              3 rec-s
            </Text>
          }
        />
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center' }}>№</th>
              <th style={{ textAlign: 'center' }}>Date/Time</th>
              <th style={{ textAlign: 'center' }}>Place</th>
              <th style={{ textAlign: 'center' }}>Title</th>
              <th style={{ textAlign: 'center' }}>Subject</th>
              <th style={{ textAlign: 'center' }}>Descr</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        {/* <RingProgress
          size={170}
          thickness={16}
          label={
            <Text size="xs" align="center" px="xs" sx={{ pointerEvents: 'none' }}>
              Hover sections to see tooltips
            </Text>
          }
          sections={[
            { value: 40, color: 'cyan', tooltip: 'Documents – 40 Gb' },
            { value: 25, color: 'orange', tooltip: 'Apps – 25 Gb' },
            { value: 15, color: 'grape', tooltip: 'Other – 15 Gb' },
          ]}
        /> */}
        <Progress
          mt="md"
          size="xl"
          radius="sm"
          sections={[
            { value: 60, color: 'grape', label: 'МСРЭС' },
            { value: 40, color: 'violet', label: 'МГРЭС' },
          ]}
        />
        <Select
          data={['Date', 'Workplace']}
          clearable
          // defaultValue={sortBy}
          onChange={(e) => dispatch(setSortBy(e))}
        />

        <SegmentedControl
          radius="0"
          size="md"
          data={[
            'МГРЭС',
            'МСРЭС',
            'ОДС',
            'Быхов',
            'Белыничи',
            'Чаусы',
            'Круглое',
            'Дрибин',
            'Горки',
            'Шклов',
          ]}
          // classNames={classes}
        />
      </ScrollArea>
      <Pagination total={10} style={{ position: 'absolute', left: '20%', bottom: '1%' }} />
    </>
  );
}
