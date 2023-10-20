import React, { useEffect, useState } from "react";
import { TableReviews } from "../components/Table/TableReviews";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "../mutations/user";
import { GET_ALL_USER, GET_ONE_USER } from "../query/user";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Container, Progress, RingProgress, Text, Pagination, createStyles, rem} from "@mantine/core";
import { colors } from "../db/colors";
import { selectWorkplaceStats } from "../store/sortHistoryBy/selectors";

const Table: React.FC = () => {
  
  const numberOfRecords = useSelector(
    (state: RootState) => state.history.length
  );
  const workplaceStats = useSelector(selectWorkplaceStats);

  return (
    <>
      <Progress
        mt="md"
        size="xl"
        radius="sm"
        style={{ textTransform: "capitalize" }}
        sections={Object.entries(workplaceStats).map(
          (el: any, idx: number) => ({
            value: el[1],
            color: colors[idx],
            label: el[0],
          })
        )}
      />
      <TableReviews />
      <Pagination total={10} style={{ position: 'absolute', left: '20%', bottom: '1%' }} />
    </>
  );
};

export default Table;
