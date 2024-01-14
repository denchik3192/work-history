import { Center, Loader } from '@mantine/core';

function Spiner() {
  return (
    <>
      <Center bg={'dark'} style={{ height: window.innerHeight }}>
        <Loader color="white" size={'lg'} h={'100vh'} variant="dots" />
      </Center>
    </>
  );
}

export default Spiner;
