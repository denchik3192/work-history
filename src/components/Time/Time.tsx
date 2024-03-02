import { useEffect, useState } from 'react';
import { Title } from '@mantine/core';

function Time() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString().slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString().slice(0, 5);
      setTime(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Title order={2}>{time}</Title>
    </div>
  );
}

export default Time;
