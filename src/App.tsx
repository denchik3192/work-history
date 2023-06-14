import React, { useEffect, useState } from 'react';
import './App.css';
import { GET_ALL_USER, GET_ONE_USER } from './query/user';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from './mutations/user';
import { MantineProvider, Flex } from '@mantine/core';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Table from './pages/Table';
import Home from './pages/Home';
import Security from './pages/Security';
import { Box } from '@mantine/core';

type User = {
  id: number;
  username: String;
  age: String;
};

type M = React.MouseEvent<HTMLBodyElement> & {
  path: Node[];
};

const App: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USER);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 2,
    },
  });

  console.log(oneUser);

  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('0');

  // const addUser = (e: any) => {
  //   e.preventDefault();
  //   newUser({
  //     variables: {
  //       input: {
  //         username,
  //         age,
  //       },
  //     },
  //   }).then(({ data }) => {
  //     console.log(data);
  //     setUsername('');
  //     setAge('0');
  //   });
  // };
  // const getAllUsers = (e: any) => {
  //   e.preventDefault();
  //   refetch();
  // };

  // useEffect(() => {
  //   if (!loading) {
  //     setUsers(data.getAllUsers);
  //   }
  // }, [data]);

  // if (loading) {
  //   return <div>...loading</div>;
  // }

  console.log(users);

  return (
    <div className="App">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Flex>
          <NavbarSegmented />
          <Box w={'100%'} p={'40px 20px'}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Table />} />
              <Route path="/security" element={<Security />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Flex>
      </MantineProvider>
    </div>
  );
};

export default App;
