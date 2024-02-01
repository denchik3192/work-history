import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString().slice(0,5);
      const newDate = new Date().toLocaleDateString();
      setTime(newTime);
      setDate(newDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Title order={2}>{time}</Title>
      {/* <div>{date}</div> */}
    </div>
  );
}

export default Time;
