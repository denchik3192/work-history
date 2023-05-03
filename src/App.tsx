import React, { useEffect, useState } from 'react';
import './App.css';
import { GET_ALL_USER, GET_ONE_USER } from './query/user';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from './mutations/user';
import { HeaderMegaMenu } from './components/Hedaer/HeaderMegaMenu';
import { SegmentedToggle } from './components/SegmentedToggle';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { TableReviews } from './components/Table/TableReviews';

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

  const addUser = (e: any) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge('0');
    });
  };
  const getAllUsers = (e: any) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  if (loading) {
    return <div>...loading</div>;
  }

  console.log(users);

  return (
    <div className="App">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <HeaderMegaMenu />
        {/* <SegmentedToggle /> */}
        <TableReviews data={users} />

        <form>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
          <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
          <div className="buttons">
            <button onClick={(e) => addUser(e)}>Создать</button>
            <button onClick={(e) => getAllUsers(e)}>Получать</button>
          </div>
        </form>

        {users.map((u: User) => (
          <div className="user" key={u.id}>
            {u.username} {u.age}
          </div>
        ))}
      </MantineProvider>
    </div>
  );
};

export default App;
