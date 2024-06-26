import {
  Table,
  ScrollArea,
  Button,
  CSSObject,
  MediaQuery,
  SegmentedControl,
} from "@mantine/core";
import {} from "../../store/settings/actions";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { TNewRecord } from "../../types/TNewRecord";
import Spiner from "../Spiner/Spiner";
import { doc, deleteDoc } from "firebase/firestore";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { convertDataTolocale } from "../../helpers/convertDataToLacale";
import { convertNumberRecord } from "../../helpers/convertNumberRecord";

export function TableReviews({
  activePage,
  itemsPerPage,
}: {
  activePage: number;
  itemsPerPage: number;
}) {
  const { auth, firestore } = useContext(Context);
  const dispatch = useAppDispatch();
  const historyData = useSelector((state: RootState) => state.history.items);
  const [value, loading, error] = useCollectionData(
    collection(firestore, "work-history")
  );

  async function deleteRecord(id: string) {
    await deleteDoc(doc(firestore, "work-history", `${id}`)).then(() => {
      notifications.show({
        color: "red",
        icon: <IconCheck />,
        title: "Seccess",
        message: "Your record was deleted!",
        autoClose: 1000,
      });
    });
  }

  const rows = historyData?.map((row: any, idx: number) => {
    const date = convertDataTolocale(row);
    const numberRecord = convertNumberRecord(idx, activePage, itemsPerPage) 
    return (
      //fix key
      <tr key={row.id}>
        <td>{numberRecord}</td>
        <td>{date}</td>
        <td>{row.place}</td>
        <td>{row.title}</td>
        <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
          <td style={{ maxWidth: "200px", overflow: "hidden" }}>
            {row.comment}
          </td>
        </MediaQuery>

        <td>
          <Link to={`/history/:${row.id}`}>
            <Button
              variant="light"
              radius="xs"
              style={{ height: "30px" }}
              mr={"xs"}
            >
              View
            </Button>
          </Link>

          <Button
            mt={"xs"}
            variant="light"
            color="red"
            radius="xs"
            onClick={() => deleteRecord(row.id)}
            style={{ height: "30px" }}
          >
            Dele
          </Button>
        </td>
      </tr>
    );
  });

  if (loading) {
    return <Spiner />;
  }

  return (
    <>
      {/* <Select
          data={['Date', 'Workplace']}
          clearable
          // defaultValue={sortBy}
          onChange={(e) => dispatch(sortByAction(e))}
        /> */}

      {/* <SegmentedControl
        // onChange={(e) => changeWorkPlace(e)}
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
      <ScrollArea h={"calc(100vh - 115px)"}>
        <Table verticalSpacing="xs" fontSize="sm">
          <thead
            style={{
              position: "sticky",
              top: "0",
              background: "#1A1B1E",
              zIndex: "10",
            }}
          >
            <tr>
              <th>№</th>
              <th>Date/Time</th>
              <th>Place</th>
              <th>Title</th>
              <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                <th>Descr</th>
              </MediaQuery>
              <th>view/del</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
