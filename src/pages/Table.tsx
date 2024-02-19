import { useContext, useEffect, useState } from "react";
import { TableReviews } from "../components/Table/TableReviews";
import { Pagination } from "@mantine/core";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
// import { Context } from "..";
import { useAppDispatch } from "../store/store";
import { addItems } from "../store/history/actions";

const Table: React.FC = () => {
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  // const { firestore, auth, loading} = useContext(Context);

  // const firstQuery = query(
  //   collection(firestore, "work-history"),
  //   orderBy("timeValue", "asc")
  // );

  useEffect(() => {
    // fetchData();
  }, [activePage]);

  async function fetchData() {
    // onSnapshot(firstQuery, (snapshot: any) => {
    //   let historyCollection: any[] = [];
    //   snapshot.docs.forEach((doc: any) => {
    //     historyCollection.push({ ...doc.data(), id: doc.id });
    //   });
    //   const totalCount = snapshot?.size || 0;
    //   setTotalPages(Math.ceil(totalCount / itemsPerPage));
    //   const indexOfLastItem = activePage * itemsPerPage;
    //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //   const currentItems = historyCollection.slice(
    //     indexOfFirstItem,
    //     indexOfLastItem
    //   );
    //   dispatch(addItems(currentItems));
    // });
  }

  console.log("table renderr");

  return (
    <>
      <TableReviews activePage={activePage} itemsPerPage={itemsPerPage}/>
      <Pagination value={activePage} onChange={setPage} total={totalPages} />
    </>
  );
};

export default Table;
