import React, { useEffect, useState } from "react";
import { Title, Group, Indicator, Flex } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import NewRecordForm from "../components/NewRecordForm/NewRecordForm";
import Time from "../components/Time/Time";

const Home: React.FC = () => {
  console.log("home render");

  return (
    <>
      <Title order={1}>New record</Title>
      <Group>
        <NewRecordForm />
        <Flex direction={"column"} style={{ alignSelf: "flex-start" }} align="center">
          <Time></Time>
          <Calendar
            static
            renderDay={(date) => {
              const day = date.getDate();
              const today = new Date().toISOString().slice(8, 10);
              return (
                <Indicator
                  size={8}
                  color="#09B8FF"
                  offset={-2}
                  disabled={day !== +today}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }}
          />
        </Flex>
      </Group>
    </>
  );
};

export default Home;
