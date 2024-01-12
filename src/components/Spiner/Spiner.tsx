import { Center, Container, Loader } from '@mantine/core';

function Spiner() {
  return (
    <>
      <Center>
        <Loader color="cyan" size={'lg'} />
      </Center>
    </>
  );
}

export default Spiner;
