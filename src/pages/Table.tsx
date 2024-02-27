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
  const [items, setItems] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isEmpty, setIsEmpty] = useState<any>(null);
  const itemsLingth = useSelector(selectNumberOfRecords);
  const colRef = collection(firestore, 'work-history');
  // const items = useSelector((state: RootState) => state.history.items);
  console.log(items);
  console.log(lastVisible);

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      const qery = query(colRef, orderBy('timeValue', 'asc'), limit(10));
      const documentSnapshots = await getDocs(qery);
      const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(qery, (snapshot: any) => {
        let historyCollection: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          historyCollection.push({ ...doc.data(), id: doc.id });
        });
        setItems(historyCollection);
        setLastVisible(last);
      });
    };
    fetchItemsFromFireStore();
  }, []);

  const loadMore = async () => {
    const qery = query(colRef, orderBy('timeValue', 'asc'), limit(10), startAfter(lastVisible));
    const documentSnapshots = await getDocs(qery);
    if (documentSnapshots.size === 0) {
      setIsEmpty(true);
    }
    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    onSnapshot(qery, (snapshot: any) => {
      let historyCollection: any[] = [];
      snapshot.docs.forEach((doc: any) => {
        historyCollection.push({ ...doc.data(), id: doc.id });
      });
      setItems((items) => [...items, ...historyCollection]);
      setLastVisible(last);
    });
  };

  console.log('table renderr');

  return (
    <>
      <TableReviews activePage={activePage} itemsPerPage={itemsPerPage} items={items} />
      <Button
        fullWidth
        disabled={isEmpty}
        leftIcon={<IconArrowDown />}
        color="orange"
        mr={'md'}
        onClick={loadMore}>
        {isEmpty ? 'All Records Loaded ' : 'More'}
      </Button>
    </>
  );
};

export default Table;
