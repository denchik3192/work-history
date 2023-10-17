import { Modal, Button, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Image, Text, Group, Badge, Center } from '@mantine/core';
import classes from './HistoryRecord.module.css';

function HistoryRecord() {
  const { id } = useParams();
  const record = useSelector((state) => state.history[id.slice(1) - 1]);
  console.log(record);

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <div>
            <Text fw={500}>
              {record.title} {record.subject}
            </Text>
            <Text fz="xs" c="dimmed">
              {record.place}
            </Text>
          </div>
          <Badge variant="outline">№{record.id}</Badge>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text fz="sm" c="dimmed" className={classes.label}>
            description:
          </Text>

          <Group gap={8} mb={-8}>
            {record.descr}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group gap={30}>
            <div>
              <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                Date
              </Text>
              <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                {record.date}
              </Text>
            </div>

            <Link to={'/history'}>
              {' '}
              <Button variant={'outline'} radius="md">
                Back
              </Button>
            </Link>
            <Link to={'/'}>
              <Button variant={'gradient'} radius="md">
                Home
              </Button>
            </Link>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
}

export default HistoryRecord;
