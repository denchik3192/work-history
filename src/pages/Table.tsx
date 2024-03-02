import { useEffect, useState } from 'react';
import { TableReviews } from '../components/Table/TableReviews';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Pagination } from '@mantine/core';
import { firestore } from '../FireBase/Config';
import Spiner from '../components/Spiner/Spiner';
import { useAppDispatch } from '../store/store';
import { addItems } from '../store/history/actions';

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const [isLoading] = useState<boolean>(false);
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useAppDispatch();
  const firstQuery = query(collection(firestore, 'work-history'), orderBy('timeValue', 'asc'));

  useEffect(() => {
    async function fetchData() {
      onSnapshot(firstQuery, (snapshot: any) => {
        let historyCollection: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          historyCollection.push({ ...doc.data(), id: doc.id });
        });
        const totalCount = snapshot?.size || 0;
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
        const indexOfLastItem = activePage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = historyCollection.slice(indexOfFirstItem, indexOfLastItem);
        dispatch(addItems(currentItems));
      });
    }
    fetchData();
  }, [activePage, dispatch, firstQuery]);

  return (
    <>
      {isLoading ? <Spiner /> : <TableReviews />}
      <Pagination value={activePage} onChange={setPage} total={totalPages} color="indigo" />
    </>
  );
};

export default Table;
