import { useContext, useEffect, useState } from 'react';
import { TableReviews } from '../components/Table/TableReviews';

import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { Context } from "..";
import { useAppDispatch } from '../store/store';
import { addItems } from '../store/history/actions';
import { Pagination } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectNumberOfRecords } from '../store/statistic/selectors';

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const items = useSelector(selectNumberOfRecords);

  const getTotalPages = () => {
    return items / itemsPerPage;
  };

  const total = getTotalPages();

  console.log('table renderr');

  return (
    <>
      <TableReviews activePage={activePage} itemsPerPage={itemsPerPage} />
      <Pagination total={total} color="indigo" value={activePage} onChange={setPage} />
    </>
  );
};

export default Table;
