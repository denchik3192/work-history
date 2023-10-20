import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Title order={2}>{time}</Title>;
}

export default Time;
