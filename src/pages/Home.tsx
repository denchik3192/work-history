import { Box, Button, Flex, Group, MultiSelect } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { substations, workSubject, workTitle, workplace } from "../db/db";
import { DateTimePicker } from "@mantine/dates";
import { IconCheck } from "@tabler/icons-react";
import {
  createStyles,
  SegmentedControl,
  rem,
  Select,
  Container,
  Title,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useAppDispatch } from "../store/store";
import { addNewRecord } from "../store/history/actions";
import { TPType } from "../db/db";
import Substations from "../components/Substations/Substations";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
    margin: "10px auto",
    width: "100%",
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
    // marginBottom: '10px',
  },

  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}));

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [workPlaceValue, setWorkplaceValue] = useState<string>("");
  const [workTitleValue, setWorkTitleValue] = useState<string>("");
  const [commentValue, setCommentValue] = useState("");
  const [workSubjectValue, setWorkSubjectValue] = useState("МУРС");
  const [substationType, setSubstationType] = useState<String>("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [numberOfTP, setNumberOfTP] = useState("");

  const form = useForm({
    initialValues: { workplace: '', workTitle: '' },
    validate: {
      workplace: (value) => (value.length < 1 ? 'Field must not be empty' : null),
      workTitle: (value) => (value.length < 1 ? 'Field must not be empty' : null),
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // fix
      const getFullDate = () => {
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().toISOString().slice(11, 16);
        setDateValue(date);
        setTimeValue(time);
      };
      getFullDate();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const saveData = () => {
    dispatch(
      addNewRecord({
        workPlaceValue,
        workSubjectValue,
        workTitleValue,
        commentValue: commentValue + substationType + "-" + numberOfTP + " " ,
        dateValue,
        timeValue,
      })
    );
    setWorkplaceValue("");
    setWorkSubjectValue("");
    setWorkTitleValue("");
    setSubstationType("");
    setNumberOfTP("");
    setCommentValue("");
  };

  return (
    <>
      <Title order={1}>New record</Title>
      <Group position="apart">
        <form onSubmit={form.onSubmit(console.log)}>
          <Box>
            <SegmentedControl
              maw={500}
              data={workSubject}
              classNames={classes}
              value={workSubjectValue}
              onChange={(e) => setWorkSubjectValue(e)}
            />
            <Select
            {...form.getInputProps('workplace')}
              withAsterisk
              maw={500}
              data={workplace}
              placeholder="Pick workplace"
              clearable
              style={{ marginBottom: "10px", margin: "20px auto" }}
              value={workPlaceValue}
              onChange={(e: any) => setWorkplaceValue(e)}
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
            />
            <Select
            {...form.getInputProps('workTitle')}
              data={workTitle}
              maw={500}
              placeholder="Pick title"
              clearable
              style={{ marginBottom: "10px", margin: "20px auto" }}
              value={workTitleValue}
              onChange={(e: any) => setWorkTitleValue(e)}
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
            />
            <DateTimePicker
              placeholder="Pick date and time"
              maw={600}
              mx="auto"
              clearable
              // renderDay={true}
              value={new Date()}
            />
          </Box>
        </form>
        <Substations
          substationType={substationType}
          setSubstation={setSubstationType}
          numberOfTP={numberOfTP}
          setNumberOfTP={setNumberOfTP}
          commentValue={commentValue}
          setCommentValue={setCommentValue}
        ></Substations>
      </Group>

      <Group position="center">
        <Button
          w={"100%"}
          h={"50px"}
          // disabled
          // style={{ position: 'absolute', bottom: '20px' }}
          onClick={saveData}
        >
          Apply
        </Button>
      </Group>
      {/* </Box> */}
    </>
  );
};

export default Home;
