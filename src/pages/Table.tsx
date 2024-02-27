import { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import Spiner from '../components/Spiner/Spiner';

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isEmpty, setIsEmpty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsLingth = useSelector(selectNumberOfRecords);
  const colRef = collection(firestore, 'work-history');
  // const items = useSelector((state: RootState) => state.history.items);
  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      setIsLoading(true);
      const qery = query(colRef, orderBy('timeValue', 'desc'), limit(10));
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
      setIsLoading(false);
      if (documentSnapshots.size === 0) {
        setIsEmpty(true);
      }
    };
    fetchItemsFromFireStore();
  }, []);

  const loadMore = async () => {
    setIsLoading(true);
    const qery = query(colRef, orderBy('timeValue', 'desc'), limit(10), startAfter(lastVisible));
    const documentSnapshots = await getDocs(qery);

    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    onSnapshot(qery, (snapshot: any) => {
      let historyCollection: any[] = [];
      snapshot.docs.forEach((doc: any) => {
        historyCollection.push({ ...doc.data(), id: doc.id });
      });
      setItems((items) => [...items, ...historyCollection]);
      setLastVisible(last);
      setIsLoading(false);
    });
    if (documentSnapshots.size === 0) {
      setIsEmpty(true);
    }
  };

  console.log('table renderr');
  if (isLoading) {
    return <Spiner />;
  }

  return (
    <>
      <TableReviews items={items} />
      <Button
        fullWidth
        disabled={isEmpty}
        leftIcon={<IconArrowDown />}
        color={isEmpty ? 'orange' : 'blue'}
        variant="light"
        mr={'md'}
        onClick={loadMore}>
        {isEmpty ? 'All Records Loaded ' : 'More'}
      </Button>
    </>
  );
};

export default Table;
