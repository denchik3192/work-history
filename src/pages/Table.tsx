import { useContext, useEffect, useState } from 'react';
import { TableReviews } from '../components/Table/TableReviews';

import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
// import { Context } from "..";
import { RootState, useAppDispatch } from '../store/store';
import { addItems } from '../store/history/actions';
import { Button, Flex, Pagination } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectNumberOfRecords } from '../store/statistic/selectors';
import { IconArrowDown, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { fetchItemsFromFireStore, loadMoreItems } from '../store/history/reducers';
import { firestore } from '../FireBase/Config';

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsLingth = useSelector(selectNumberOfRecords);
  const items = useSelector((state: RootState) => state.history.items);
  console.log(items);

  // const getTotalPages = () => {
  //   return itemsLingth / itemsPerPage;
  // };

  // const total = getTotalPages();

  const handlePrevClick = async () => {
    const firstVisible = items[0];
    const colRef = collection(firestore, 'work-history');
    const first = query(colRef, orderBy('timeValue', 'asc'), startAfter(firstVisible), limit(10));
    const documentSnapshots = await getDocs(first);
    const prevItems = documentSnapshots.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
    console.log(prevItems);

    // Обновляем состояние Redux
    // dispatch({ type: 'ADD_ITEMS', payload: prevItems });
  };

  const loadMore = async () => {
    dispatch(loadMoreItems());
  };

  console.log('table renderr');

  return (
    <>
      <TableReviews activePage={activePage} itemsPerPage={itemsPerPage} />
      <Button
        fullWidth
        variant="outline"
        leftIcon={<IconArrowDown />}
        color="orange"
        mr={'md'}
        onClick={loadMore}>
        More
      </Button>
    </>
  );
};

export default Table;
