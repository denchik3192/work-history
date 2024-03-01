import { Table, ScrollArea, Button, MediaQuery } from '@mantine/core';
import {} from '../../store/settings/actions';
import { useAppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { convertDataTolocale } from '../../helpers/convertDataToLacale';
import { deleteItem } from '../../store/history/reducers';
import { useLayoutEffect, useRef } from 'react';
import { TNewRecord } from '../../types/TNewRecord';

export function TableReviews({ items }: { items: TNewRecord[] }) {
  const dispatch = useAppDispatch();
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

  useLayoutEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [items]);

  async function deleteRecord(id: string) {
    dispatch(deleteItem(id));

    notifications.show({
      color: 'red',
      icon: <IconCheck />,
      title: 'Seccess',
      message: 'Your record was deleted!',
      autoClose: 1000,
    });
  }

  const rows = items?.map((row: any, idx: number) => {
    const date = convertDataTolocale(row.timeValue);
    return (
      <tr key={row.id} ref={idx === items.length - 1 ? lastRowRef : null}>
        <td>{idx + 1}</td>
        <td>{date}</td>
        <td>{row.place}</td>
        <td>{row.title}</td>
        <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
          <td style={{ maxWidth: '200px', overflow: 'hidden' }}>{row.comment}</td>
        </MediaQuery>

        <td>
          <Link to={`/history/:${row.id}`}>
            <Button variant="light" radius="xs" style={{ height: '30px' }} mr={'xs'}>
              View
            </Button>
          </Link>

          <Button
            mt={'xs'}
            variant="light"
            color="red"
            radius="xs"
            onClick={() => deleteRecord(row.id)}
            style={{ height: '30px' }}>
            Dele
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <ScrollArea h={'calc(100vh - 115px)'}>
        <Table verticalSpacing="xs" fontSize="sm">
          <thead
            style={{
              position: 'sticky',
              top: '0',
              background: '#1A1B1E',
              zIndex: '10',
            }}>
            <tr>
              <th>№</th>
              <th>Date/Time</th>
              <th>Place</th>
              <th>Title</th>
              <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
                <th>Descr</th>
              </MediaQuery>
              <th>view/del</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
