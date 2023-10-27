import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { useForm } from "@mantine/form";
import { addNewRecord } from "../../store/history/actions";
import {
  Button,
  SegmentedControl,
  Select,
  Box,
  rem,
  createStyles,
  Flex,
} from "@mantine/core";
import { workSubject, workTitle, workplace } from "../../db/db";
import { DateTimePicker } from "@mantine/dates";
import Substations from "../Substations/Substations";
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

function NewRecordForm() {
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

  // const form = useForm({
  //   initialValues: { place: '', title: '' },

    
  //   validate: {
  //     place: (value) => (value.length < 1 ? "Not Empty" : null),
  //     title: (value) => (value.length < 1 ? "Not Empty" : null),
  //   },
  // });

  useEffect(() => {
    const interval = setInterval(() => {
      const getFullDate = () => {
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().toISOString().slice(11, 16);
        setDateValue(date);
        setTimeValue(time);
      };
      getFullDate();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const saveData = (e:any) => {
    
    e.preventDefault();
    dispatch(
      addNewRecord({
        workPlaceValue,
        workSubjectValue,
        workTitleValue,
        commentValue: commentValue + substationType + "-" + numberOfTP + " ",
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
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <form onSubmit={saveData}>
          <Box>
            <SegmentedControl
              data={workSubject}
              classNames={classes}
              value={workSubjectValue}
              onChange={(e) => setWorkSubjectValue(e)}
            />
            <Select
              label="Workplace"
              // {...form.getInputProps("place")}
              withAsterisk
              data={workplace}
              placeholder="Pick workplace"
              clearable
              value={workPlaceValue}
              onChange={(e: any) => setWorkplaceValue(e)}
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
            />
            <Select
              label="Title"
              // {...form.getInputProps("title")}
              data={workTitle}
              placeholder="Pick work title"
              clearable
              value={workTitleValue}
              onChange={(e: any) => setWorkTitleValue(e)}
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
            />
            <DateTimePicker
              style={{ display: "none" }}
              label="Date/Time"
              placeholder="Pick date and time"
              mx="auto"
              clearable
              // renderDay={true}
              value={new Date()}
            />
          </Box>
          <Box>
            <Substations
              substationType={substationType}
              setSubstation={setSubstationType}
              numberOfTP={numberOfTP}
              setNumberOfTP={setNumberOfTP}
              commentValue={commentValue}
              setCommentValue={setCommentValue}
            ></Substations>
          </Box>
          <Button fullWidth size="lg" type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
}

export default NewRecordForm;
