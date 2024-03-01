import { useEffect, useRef, useState } from 'react';
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
import { useAppDispatch } from '../store/store';
import { Box, Button, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectNumberOfRecords } from '../store/statistic/selectors';
import { IconArrowDown } from '@tabler/icons-react';
import { firestore } from '../FireBase/Config';
import Spiner from '../components/Spiner/Spiner';

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isEmpty, setIsEmpty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsLength = useSelector(selectNumberOfRecords);
  const colRef = collection(firestore, 'work-history');

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      setIsLoading(true);
      const qery = query(colRef, orderBy('timeValue', 'desc'), limit(itemsPerPage));
      const documentSnapshots = await getDocs(qery);
      const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(qery, (snapshot: any) => {
        let historyCollection: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          historyCollection.push({ ...doc.data(), id: doc.id });
        });
        setItems(historyCollection);
        setLastVisible(last);
        setIsLoading(false);
      });
    };
    fetchItemsFromFireStore();
  }, []);

  const loadMore = async () => {
    setIsLoading(true);
    const qery = query(
      colRef,
      orderBy('timeValue', 'desc'),
      limit(itemsPerPage),
      startAfter(lastVisible),
    );
    const documentSnapshots = await getDocs(qery);
    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    onSnapshot(qery, (snapshot: any) => {
      let historyCollection: any[] = [];
      snapshot.docs.forEach((doc: any) => {
        historyCollection.push({ ...doc.data(), id: doc.id });
      });
      setItems((items) => [...items, ...historyCollection]);
      setIsLoading(false);
      setLastVisible(last);
    });
  };

  return (
    <>
      {items.length === 0 ? (
        <Text>No Records</Text>
      ) : (
        <>
          {isLoading ? <Spiner /> : <TableReviews items={items} />}
          <Button
            fullWidth
            disabled={isEmpty}
            leftIcon={<IconArrowDown />}
            variant="light"
            mr={'md'}
            onClick={loadMore}>
            {isEmpty ? 'All Records Loaded ' : 'More'} ( {itemsLength - items.length} )
          </Button>
        </>
      )}
    </>
  );
};

export default Table;
