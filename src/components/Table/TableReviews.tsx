import {
  Table,
  ScrollArea,
  Select,
  SegmentedControl,
  Button,
  Modal,
} from "@mantine/core";
import {} from "../../store/settings/actions";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
  selectHistoryByFilter,
  selectWorkplaceStats,
} from "../../store/sortHistoryBy/selectors";
import { sortByAction } from "../../store/sortHistoryBy/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addItems, deleteRecord } from "../../store/history/actions";
import { setItemsToLS } from "../../utils/SetItemsToLS";
import { getItemsFromLS } from "../../utils/GetItemsFromLS";

interface TableReviewsProps {
  data: {
    id: number;
    date: String;
    place: String;
    title: String;
    subject: String;
    descr: String;
  }[];
}

export function TableReviews() {
  const [workplace, setWorkplace] = useState<String>("Все");
  const dispatch = useAppDispatch();
  const filteredHistory = useSelector(selectHistoryByFilter);
  useEffect(() => {
    const items = getItemsFromLS();
    if (items.length) dispatch(addItems(items));
  }, [dispatch]);

  const filteredHistoryWorkplace = filteredHistory?.filter((el: any) => {
    if (workplace === "Все") {
      return el;
    } else {
      return el.place?.toLowerCase() === workplace.toLowerCase();
    }
  });

  const rows = filteredHistoryWorkplace?.map((row, idx) => {
    return (
      
      <tr key={row.id}>
        <td>{idx+1}</td>
        <td>{row.date}</td>
        <td>{row.place}</td>
        <td>{row.title}</td>
        <td>{row.subject}</td>
        <td>{row.descr}</td>
        <td>
          <Link to={`/history/:${row.number}`}>
            <Button variant="light" radius="xs" style={{ marginRight: "10px" }}>
              View
            </Button>
          </Link>

          <Button
            variant="light"
            color="red"
            radius="xs"
            onClick={(id: any) => dispatch(deleteRecord(row.id))}
          >
            Del
          </Button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    setItemsToLS(filteredHistoryWorkplace);
  }, [filteredHistoryWorkplace]);

  const changeWorkPlace = (e: String) => {
    setWorkplace(e);
  };

  return (
    <>
      {/* <Select
          data={['Date', 'Workplace']}
          clearable
          // defaultValue={sortBy}
          onChange={(e) => dispatch(sortByAction(e))}
        /> */}

      {/* <SegmentedControl
          onChange={(e) => changeWorkPlace(e)}
          radius="0"
          size="md"
          data={[
            'Все',
            'МГРЭС',
            'МСРЭС',
            'ОДС',
            'Быхов',
            'Белыничи',
            'Чаусы',
            'Круглое',
            'Дрибин',
            'Горки',
            'Шклов',
          ]}
        /> */}
      <ScrollArea h={'80vh'}>
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th>№</th>
            <th>Date/Time</th>
            <th>Place</th>
            <th>Title</th>
            <th>Subject</th>
            <th>Descr</th>
            <th>view/del</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </Table>

      </ScrollArea>
    </>
  );
}
