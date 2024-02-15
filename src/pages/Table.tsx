import { TableReviews } from "../components/Table/TableReviews";
import { MediaQuery, Pagination } from "@mantine/core";

const Table: React.FC = () => {
  return (
    <>
      <TableReviews />
      <MediaQuery smallerThan={"sm"} styles={{position: "absolute", left:'10'}}>
        <Pagination size={'sm'}
          total={10}
        />
      </MediaQuery>
    </>
  );
};

export default Table;
