import { Modal, Button, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Text, Group, Badge } from '@mantine/core';
import classes from './HistoryRecord.module.css';

function HistoryRecord() {
  const { id } = useParams();
  const record = useSelector((state) => state.history.items[id.slice(1) - 1]);

  if (!record) {
    return <Card>{'Can not find the record'} </Card>;
  }

  return (
    <>
      <Card withBorder radius="md" className={classes.card} maw={'400px'}>
        <Card.Section className={classes.imageSection}>
          <Title order={1}>{record.place}</Title>
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
          <Badge variant="outline">№{id}</Badge>
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
                Date/time
              </Text>
              <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                {record.date} {record.time}
              </Text>
            </div>
          </Group>
        </Card.Section>
      </Card>
      <Card withBorder mt={10} radius="md" className={classes.card} maw={'400px'}>
        <Group position="apart">
          <Link to={'/history'} w={'100%'}>
            <Button color="black" radius="md">
              Back
            </Button>
          </Link>
          <Link to={'/'}>
            <Button color="green" radius="md">
              Home
            </Button>
          </Link>
        </Group>
      </Card>
    </>
  );
}

export default HistoryRecord;
