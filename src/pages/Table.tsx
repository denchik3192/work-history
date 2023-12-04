import { TableReviews } from "../components/Table/TableReviews";
import { Pagination} from "@mantine/core";

const Table: React.FC = () => {

  return (
    <>
      <TableReviews />
      <Pagination total={10} style={{ position: 'absolute', left: '20%', bottom: '1%' }} />
    </>
  );
};

export default Table;
