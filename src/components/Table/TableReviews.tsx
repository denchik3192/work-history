import {
  Table,
  ScrollArea,
  Select,
  SegmentedControl,
  Button,
  Modal,
} from "@mantine/core";
import { setSortBy } from "../../store/settings/actions";
import { RootState, useAppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHistoryByFilter,
  selectWorkplaceStats,
} from "../../store/sortHistoryBy/selectors";
import { sortByAction } from "../../store/sortHistoryBy/actions";
import { useState } from "react";
import { colors } from "../../db/colors";
import { useDisclosure } from "@mantine/hooks";
import { Icon360View, IconHttpDelete, IconPalette } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { deleteRecord } from "../../store/history/actions";

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

export function TableReviews({ data }: TableReviewsProps) {
  const [isopened, { open, close }] = useDisclosure(false);
  const [workplace, setWorkplace] = useState<String>("Все");
  const dispatch = useAppDispatch();
  const filteredHistory = useSelector(selectHistoryByFilter);

  const workplaceStats = useSelector(selectWorkplaceStats);

  const filteredHistoryWorkplace = filteredHistory.filter((el: any) => {
    if (workplace === "Все") {
      return el;
    } else {
      return el.place.toLowerCase() === workplace.toLowerCase();
    }
  });

  const rows = filteredHistoryWorkplace.map((row, idx) => {
    
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.date}</td>
        <td>{row.place}</td>
        <td>{row.title}</td>
        <td>{row.subject}</td>
        <td>{row.descr}</td>
        <td>
          <Link to={`/history/:${row.id}`}>
            <Button
              variant="light"
              onClick={open}
              radius="xs"
              style={{ marginRight: "10px" }}
            >
              View
            </Button>
          </Link>

          <Button variant="light" color="red" radius="xs" onClick={(id:any)=> dispatch(deleteRecord(id))}>
            Del
          </Button>
        </td>
      </tr>
    );
  });

  const changeWorkPlace = (e: String) => {
    setWorkplace(e);
  };

  return (
    <>
      <ScrollArea style={{ width: "100%", marginTop: "0px" }}>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ textAlign: "center" }}>№</th>
              <th style={{ textAlign: "center" }}>Date/Time</th>
              <th style={{ textAlign: "center" }}>Place</th>
              <th style={{ textAlign: "center" }}>Title</th>
              <th style={{ textAlign: "center" }}>Subject</th>
              <th style={{ textAlign: "center" }}>Descr</th>
              <th style={{ textAlign: "center" }}>view/del</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        <Select
          data={["Date", "Workplace"]}
          clearable
          // defaultValue={sortBy}
          onChange={(e) => dispatch(sortByAction(e))}
        />

        <SegmentedControl
          onChange={(e) => changeWorkPlace(e)}
          radius="0"
          size="md"
          data={[
            "Все",
            "МГРЭС",
            "МСРЭС",
            "ОДС",
            "Быхов",
            "Белыничи",
            "Чаусы",
            "Круглое",
            "Дрибин",
            "Горки",
            "Шклов",
          ]}
          // classNames={classes}
        />
      </ScrollArea>

      <Modal opened={isopened} onClose={close} title="Record" centered>
        pess
      </Modal>
    </>
  );
}
