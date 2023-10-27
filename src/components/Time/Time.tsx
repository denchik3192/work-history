import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      setTime(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Title order={1}>{time}</Title>;
}

export default Time;
