import { Table, ScrollArea, Button } from '@mantine/core';
import {} from '../../store/settings/actions';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { selectHistoryByFilter } from '../../store/sortHistoryBy/selectors';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { addItems, deleteRecord } from '../../store/history/actions';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { TNewRecord } from '../../types/TNewRecord';
import Spiner from '../Spiner/Spiner';

// interface TableReviewsProps {
//   data: {
//     id: number;
//     date: String;
//     place: String;
//     title: String;
//     subject: String;
//     descr: String;
//   }[];
// }

export function TableReviews() {
  const { auth, firestore } = useContext(Context);
  const dispatch = useAppDispatch();
  const [value, loading, error] = useCollectionData(collection(firestore, 'work-history'));

  const rows = value?.map((row, idx) => {
    const date = new Date(row.timeValue.seconds * 1000).toLocaleString().replace(',', '/');
    return (
      //fix key
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{date}</td>
        <td>{row.place}</td>
        <td>{row.title + ' ' + row.subject}</td>
        <td>{row.comment}</td>
        <td>
          <Link to={`/history/:${idx + 1}`}>
            <Button variant="light" radius="xs" style={{ marginRight: '10px' }}>
              View
            </Button>
          </Link>

          <Button
            variant="light"
            color="red"
            radius="xs"
            onClick={(id: any) => dispatch(deleteRecord(row.id))}>
            Del
          </Button>
        </td>
      </tr>
    );
  });

  if (loading) {
    return <Spiner />;
  }

  return (
    <>
      {/* <Select
          data={['Date', 'Workplace']}
          clearable
          // defaultValue={sortBy}
          onChange={(e) => dispatch(sortByAction(e))}
        /> */}

      {/* <SegmentedControl
          onChange={(e) => changeWorkPlace(e)}
          radius="0"
          size="md"
          data={[
            'Все',
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
        /> */}
      <ScrollArea h={'80vh'}>
        <Table verticalSpacing="xs" withBorder>
          <thead>
            <tr>
              <th>№</th>
              <th>Date/Time</th>
              <th>Place</th>
              <th>Title</th>
              <th>Descr</th>
              <th>view/del</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
