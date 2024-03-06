import { Button, Center, Image } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { Card, Text, Group, Badge } from '@mantine/core';
import { convertDataTolocale } from '../helpers/convertDataToLacale';
import { useEffect, useState } from 'react';
import { firestore } from '../FireBase/Config';
import { doc, getDoc } from 'firebase/firestore';
import Spiner from '../components/Spiner/Spiner';

function HistoryRecord() {
  const { id } = useParams();
  const [record, setRecord] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDocumentById = async (documentId) => {
      setIsLoading(true);
      const newID = documentId.slice(1);
      const docRef = doc(firestore, 'work-history', newID);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setRecord(docSnapshot.data());
      } else {
        console.log('Document not found');
      }
      setIsLoading(false);
    };
    fetchDocumentById(id);
  }, [id]);

  if (isLoading) {
    return <Spiner></Spiner>;
  }
  const date = convertDataTolocale(record?.timeValue);
  return (
    <Center maw={800}>
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
          <Text fw={500} style={{ textTransform: 'uppercase' }}>
            {record?.place}{' '}
          </Text>
        </Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={600} style={{ textTransform: 'uppercase' }}>
            {record?.title} {record?.subject}
          </Text>
        </Group>

        <Text size="m" c="dimmed">
          {record?.comment}
        </Text>

        <Group justify="space-between" mt="md" mb="xs">
          <Link to={'/history'} style={{ flex: '1 0 auto' }}>
            <Button color="black" radius="md" w={'100%'}>
              Back
            </Button>
          </Link>
          <Link to={'/'} style={{ flex: '1 0 auto' }}>
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
