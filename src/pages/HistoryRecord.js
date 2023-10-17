import { Modal, Button, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';

function HistoryRecord() {
  const { id } = useParams();
  const record = useSelector((state) => state.history[id.slice(1) - 1])
  console.log(id.slice(1));
  console.log(record);

  return (
    <>
      <Title order={2}>{record.id}</Title>
      <Title order={2}>{record.title}</Title>
      <Title order={2}>{record.place}</Title>
      <Title order={2}>{record.descr}</Title>
      <Title order={2}>{record.subject}</Title>
      <Title order={2}>{record.date}</Title>

      <Button>Back</Button>
    </>
  );
}

export default HistoryRecord