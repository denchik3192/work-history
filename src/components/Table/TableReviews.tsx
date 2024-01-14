import { Table, ScrollArea, Button } from '@mantine/core';
import {} from '../../store/settings/actions';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { addItems, deleteRecord } from '../../store/history/actions'
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { TNewRecord } from '../../types/TNewRecord';
import Spiner from '../Spiner/Spiner';
import { doc, deleteDoc } from 'firebase/firestore';

export function TableReviews() {
  const { auth, firestore } = useContext(Context);
  const dispatch = useAppDispatch();
  const historyData = useSelector((state: RootState) => state.history.items);
  const [value, loading, error] = useCollectionData(collection(firestore, 'work-history'));

  console.log(historyData);

  async function deleteRecord(id: any) {
    await deleteDoc(doc(firestore, 'work-history', `${id}`));
  }

  const rows = historyData?.map((row: any, idx: number) => {
    const date = new Date(row.timeValue.seconds * 1000).toLocaleString().replace(',', '/');
    return (
      //fix key
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{date}</td>
        <td>{row.place}</td>
        <td>{row.title + ' ' + row.subject}</td>
        <td style={{ maxWidth: '200px', overflow: 'hidden' }}>{row.comment}</td>
        <td>
          <Link to={`/history/:${row.id}`}>
            <Button variant="light" radius="xs" style={{ marginRight: '10px' }}>
              View
            </Button>
          </Link>

          <Button variant="light" color="red" radius="xs" onClick={() => deleteRecord(row.id)}>
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
      <ScrollArea h={'85vh'}>
        <Table verticalSpacing="xs">
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
