import { Center, Loader } from '@mantine/core';

const Spiner: React.FC = () => {
  return (
    <>
      <Center bg={'dark'} style={{ height: '100vh' }}>
        <Loader color="white" size={'lg'} h={'100vh'} variant="dots" />
      </Center>
    </>
  );
};

export default Spiner;
