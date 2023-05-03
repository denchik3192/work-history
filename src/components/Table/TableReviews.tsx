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

    // year: number;
    // reviews: { positive: number; negative: number };
  }[];
}

export function TableReviews({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    // const totalReviews = row.reviews.negative + row.reviews.positive;
    // const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    // const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.id}>
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
        {/* <td>{Intl.NumberFormat().format(totalReviews)}</td> */}
        <td>
          <Group position="apart">
            <Text fz="xs" c="teal" weight={700}>
              {/* {positiveReviews.toFixed(0)}% */}
            </Text>
            <Text fz="xs" c="red" weight={700}>
              {/* {negativeReviews.toFixed(0)}% */}
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            // sections={[
            //   {
            //     value: positiveReviews,
            //     color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
            //   },
            //   {
            //     value: negativeReviews,
            //     color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
            //   },
            // ]}
          />
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
