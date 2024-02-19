import { Button, Center, Image, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, Text, Group, Badge } from "@mantine/core";
// import classes from "./HistoryRecord.module.css";
import { selectItemById, selectRecordById } from "../store/history/selectors";
import { RootState } from "../store/store";
import { TNewRecord } from "../types/TNewRecord";
import { convertDataTolocale } from "../helpers/convertDataToLacale";

function HistoryRecord() {
  const { id } = useParams();
  const record = useSelector(
    (state) => state.history.items.filter((el) => el.id === id?.slice(1))[0]
  );
  // const record = useSelector(selectItemById);
  const date = convertDataTolocale(record.timeValue.seconds)

  if (!record) {
    return <Card>{"Can not find the record"} </Card>;
  }

  return (
    <Center w={800}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
        <Card.Section component="a" href="https://mantine.dev/">
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Badge>{date}</Badge>
          <Text fw={500} style={{textTransform: 'uppercase'}} >{record.place} </Text>
        </Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={600} style={{textTransform:'uppercase'}}>
            {record.title} {record.subject}
          </Text>
        </Group>

        <Text size="m" c="dimmed" >
          {record.comment}
        </Text>

        <Group justify="space-between" mt="md" mb="xs" >
        <Link to={"/history"} style={{flex: '1 0 auto'}}>
          <Button color="black" radius="md" w={'100%'}>
            Back
          </Button>
        </Link>
        <Link to={"/"} style={{flex: '1 0 auto'}}>
          <Button color="green" radius="md" w={'100%'}>
            Home
          </Button>
        </Link>
        </Group>
      </Card>
    </Center>
  );
}

export default HistoryRecord;
