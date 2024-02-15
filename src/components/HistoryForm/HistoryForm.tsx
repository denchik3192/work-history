import { useForm, isNotEmpty } from "@mantine/form";
import { serverTimestamp, addDoc, doc, collection } from "firebase/firestore";
import {
  Button,
  Flex,
  Select,
  Textarea,
  Tooltip,
  Radio,
  TextInput,
  MediaQuery,
  Notification,
} from "@mantine/core";
import {
  TPType,
  substations,
  workSubject,
  workTitle,
  workplace,
} from "../../db/db";
import { useContext, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { TNewRecord } from "../../types/TNewRecord";
import { Context } from "../..";
import Spiner from "../Spiner/Spiner";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

function HistoryForm() {
  const { auth, firestore } = useContext(Context);
  // const [user] = useAuthState(auth);
  const [searchValue, onSearchChange] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [loading] = useCollectionData();

  const form = useForm({
    initialValues: {
      place: `${workplace[0].value}`,
      subject: "",
      title: "",
      comment: "",
      numberOfTP: "",
      substationType: ``,
    },

    validate: {
      place: isNotEmpty(),
      title: isNotEmpty(),
      subject: isNotEmpty(),
    },
  });

  const sendData = async (data: TNewRecord, event: any) => {
    event.preventDefault();

    await addDoc(collection(firestore, "work-history"), {
      place: data.place,
      title: data.title + " " + data.subject,
      comment: data.comment,
      timeValue: serverTimestamp(),
      substationType: data.substationType,
      numberOfTP: data.numberOfTP,
    }).then(() => {
      notifications.show({
        icon: <IconCheck />,
        color: "teal",
        title: "Success",
        message: "Your record is sucsessfully added!",
      });
    });
    form.reset();
  };

  if (loading) {
    return <Spiner />;
  }

  return (
    <>
      <Flex gap="md" justify="space-evenly" align="center" wrap="wrap">
        <form onSubmit={form.onSubmit(sendData)}>
          <Select
            label="Place"
            withAsterisk
            {...form.getInputProps("place")}
            data={workplace}
            placeholder="Pick work place"
            clearable
            transitionProps={{
              transition: "pop-top-left",
              duration: 100,
              timingFunction: "ease",
            }}
          />

          <Select
            label="Title"
            withAsterisk
            {...form.getInputProps("title")}
            data={workTitle}
            placeholder="Pick work title"
            clearable
            transitionProps={{
              transition: "pop-top-left",
              duration: 100,
              timingFunction: "ease",
            }}
          />
          <Select
            label="Subject"
            {...form.getInputProps("subject")}
            withAsterisk
            data={workSubject}
            placeholder="Pick worksubject"
            clearable
            transitionProps={{
              transition: "pop-top-left",
              duration: 100,
              timingFunction: "ease",
            }}
          />

          <Select
            label="Select substation"
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            placeholder="Pick one"
            searchable
            nothingFound="No options"
            data={substations}
            transitionProps={{
              transition: "pop-top-left",
              duration: 100,
              timingFunction: "ease",
            }}
          />

          <Radio.Group name="substation type">
            <Flex style={{ alignItems: "center" }}>
              <Select
                pr={"sm"}
                label="Select substation type"
                data={TPType}
                {...form.getInputProps("substationType")}
              />
              <TextInput
                label="№"
                type="number"
                {...form.getInputProps("numberOfTP")}
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
            </Flex>
          </Radio.Group>
          <Textarea
            placeholder="Comment"
            label="Comment"
            {...form.getInputProps("comment")}
            style={{ marginBottom: "10px", margin: "20px auto" }}
          />
          <MediaQuery smallerThan={"sm"} styles={{ marginBottom: "auto" }}>
            <Button type="submit" fullWidth size="lg">
              Submit
            </Button>
          </MediaQuery>
        </form>
      </Flex>
    </>
  );
}

export default HistoryForm;
