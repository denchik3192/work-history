import {
  Box,
  Button,
  Chip,
  Flex,
  Group,
  MultiSelect,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { substations, workTitle, workplace } from "../db/db";
import { DateTimePicker } from "@mantine/dates";
import { IconCheck } from "@tabler/icons-react";
import { createStyles, SegmentedControl, rem, Tooltip } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useAppDispatch } from "../store/store";
import { addNewRecord } from "../store/history/actions";
import { TPType } from "../db/db";
import Substations from "../components/Substations/Substations";

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
  // const [value, setValue] = useState("");
  const [workPlaceValue, setWorkplaceValue] = useState(["МГРЭС"]);
  const [workTitleValue, setWorkTitleValue] = useState(["Обновление ПО"]);
  const [commentValue, setCommentValue] = useState("");
  const [workSubjectValue, setWorkSubjectValue] = useState("МУРС");
  const [substationType, setSubstationType] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [numberOfTP, setNumberOfTP] = useState("");
  const [focused, setFocused] = useState(false);
  const [chipValue, setChipValue] = useState([""]);
 
  

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

  console.log(numberOfTP);
  
  return (
    <Box w={"100%"} style={{ margin: "70px 20px 20px 20px" }}>
       <Flex><Group position="apart">
        <form>
          <Box>
            <SegmentedControl
              radius="0"
              maw={500}
              data={["МУРС", "Диполь", "ТМ-2000", "DMS", "MBS", "OPC"]}
              classNames={classes}
              value={workSubjectValue}
              onChange={(e) => setWorkSubjectValue(e)}
            />
            <MultiSelect
              maw={500}
              data={workplace}
              placeholder="Pick all workplace"
              clearable
              style={{ marginBottom: "10px", margin: "20px auto" }}
              value={workPlaceValue}
              onChange={(e) => setWorkplaceValue(e)}
            />
            <MultiSelect
              data={workTitle}
              maw={500}
              placeholder="Pick work title"
              clearable
              style={{ marginBottom: "10px", margin: "20px auto" }}
              value={workTitleValue}
              onChange={(e) => setWorkTitleValue(e)}
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
          <Box w={"100%"}>
            <Radio.Group
              value={substationType}
              onChange={setSubstationType}
              name="substation type"
              label="Select substation type"
              // description="This is anonymous"
              // withAsterisk
            >
              <Flex>
                {TPType.map((tp, idx) => (
                  <Radio
                    onChange={() => setSubstationType(tp.value)}
                    key={idx}
                    value={tp.value}
                    label={tp.label}
                    color="indigo"
                    style={{ marginRight: "10px" }}
                  />
                ))}
              </Flex>
            </Radio.Group>
            <TextInput
            type="number"
            onChange={(e: any) => setNumberOfTP(e.target.value)}
              label="Number of substation"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              inputContainer={(children) => (
                <Tooltip
                  label="Enter the number"
                  position="top-start"
                  opened={focused}
                >
                  {children}
                </Tooltip>
              )}
            />
            <Textarea
              placeholder="Comment"
              label="Comment"
              withAsterisk
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              style={{ marginBottom: "10px", margin: "20px auto" }}
            />
          </Box>
        </form>
      </Group>
      <Substations ></Substations>
      </Flex>

      

      <Group position="center">
        <Button
          w={"100%"}
          // disabled
          onClick={() => {
            notifications.show({
              id: "load-data",
              loading: true,
              title: "Loading your data",
              message:
                "Data will be loaded in 1 seconds, you cannot close this yet",
              autoClose: false,
              withCloseButton: false,
            });

            setTimeout(() => {
              notifications.update({
                id: "load-data",
                color: "teal",
                title: "Data was loaded",
                message:
                  "Notification will close in 1 seconds, you can close this notification now",
                icon: <IconCheck size="1rem" />,
                autoClose: 1000,
              });
            }, 1500);
            dispatch(
              addNewRecord({
                workPlaceValue,
                workSubjectValue,
                workTitleValue,
                commentValue: substationType+'-' + numberOfTP +' '+ commentValue ,
                dateValue,
                timeValue
              })
            );
          }}
        >
          Apply
        </Button>
      </Group>
      {/* <Group position="center" my="xl">
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}>
            {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
          </ActionIcon>
        </Group> */}
      {/* <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
      <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
      <div className="buttons">
        <button onClick={(e) => addUser(e)}>Создать</button>
        <button onClick={(e) => getAllUsers(e)}>Получать</button>
      </div> */}
    </Box>
  );
};

export default Home;
