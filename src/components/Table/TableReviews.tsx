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
  // data: {
  //   title: string;
  //   author: string;
  //   year: number;
  //   reviews: { positive: number; negative: number };
  // }[];
  data: {
    // username: string;
    // age: string;
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
        <td>
          <Anchor component="button" fz="sm">
            {row.id}
          </Anchor>
        </td>
        <td>
          <Anchor component="button" fz="sm">
            {row.date}
          </Anchor>
        </td>
        <td>{row.place}</td>
        <td>
          <Anchor component="button" fz="sm">
            {row.title}
          </Anchor>
        </td>
        <td>
          <Anchor component="button" fz="sm">
            {row.descr}
          </Anchor>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>№</th>
            <th>Date</th>
            <th>place</th>
            <th>title</th>
            <th>descr</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
