import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, rem } from '@mantine/core';

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
    descr: String;
  }[];
}

export function TableReviews({ data }: TableReviewsProps) {
  const rows = data.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.date}</td>
        <td>{row.place}</td>
        <td>{row.title}</td>
        <td>{row.descr}</td>
      </tr>
    );
  });

  return (
    <ScrollArea style={{ width: '100%' }}>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th style={{ textAlign: 'center' }}>№</th>
            <th style={{ textAlign: 'center' }}>Date/Time</th>
            <th style={{ textAlign: 'center' }}>Place</th>
            <th style={{ textAlign: 'center' }}>Title</th>
            <th style={{ textAlign: 'center' }}>Descr</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
