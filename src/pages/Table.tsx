import { useContext, useEffect, useState } from 'react';
import { TableReviews } from '../components/Table/TableReviews';
import { Pagination } from '@mantine/core';
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { Context } from '..';
import { useAppDispatch } from '../store/store';
import { addItems } from '../store/history/actions';

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const [lastVisible, setLastVisible] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { auth, firestore } = useContext(Context);
  const first = query(collection(firestore, 'work-history'), limit(itemsPerPage));

  useEffect(() => {
    async function getData() {
      onSnapshot(first, (snapshot: any) => {
        let historyCollection: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          historyCollection.push({ ...doc.data(), id: doc.id });
        });
        dispatch(addItems(historyCollection));
      });
    }
    getData();
  }, [activePage]);

  const fetchTotalItems = async () => {
    try {
      const snapshot = await getDocs(query(collection(firestore, 'work-history')));
      const totalCount = snapshot?.size || 0;
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } catch (error) {
      console.log('fetchTotalItems error: ', error);
    }
  };

  fetchTotalItems();
  async function loadNextCities() {
    try {
      // const documentSnapshots = await getDocs(first);
      // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = query(collection(firestore, 'work-history'), startAfter(lastVisible), limit(10));
      const nextDocumentSnapshots = await getDocs(next);

      // setlastRecord(lastVisible);

      setLastVisible(nextDocumentSnapshots.docs[nextDocumentSnapshots.docs.length - 1]);
    } catch (error) {
      console.error('Error loading next cities:', error);
    }
  }

  return (
    <>
      <TableReviews />
      <Pagination value={activePage} onChange={setPage} total={totalPages} />
      <button onClick={loadNextCities}>Load More</button>
    </>
  );
};

export default Table;
