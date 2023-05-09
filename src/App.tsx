import React, { useEffect, useState } from 'react';
import './App.css';
import { GET_ALL_USER, GET_ONE_USER } from './query/user';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from './mutations/user';
import { MantineProvider, Flex, MultiSelect, Group, Button } from '@mantine/core';
import { TableReviews } from './components/Table/TableReviews';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { DateTimePicker } from '@mantine/dates';
import { workSubject, workTitle, workplace } from './db/db';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

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
        <Flex>
          <NavbarSegmented />

          <div style={{ width: '100%' }}>
            <TableReviews data={users} />
            <MultiSelect maw={400} data={workplace} placeholder="Pick all workplace" clearable />
            <MultiSelect data={workTitle} maw={400} placeholder="Pick work title" clearable />
            <MultiSelect
              data={workSubject}
              maw={400}
              placeholder="Pick all work subject "
              clearable
            />
            <form>
              <DateTimePicker
                label="Pick date and time"
                placeholder="Pick date and time"
                maw={400}
                mx="auto"
                clearable
              />
              <Group position="center">
                <Button
                  variant="outline"
                  onClick={() => {
                    notifications.show({
                      id: 'load-data',
                      loading: true,
                      title: 'Loading your data',
                      message: 'Data will be loaded in 1 seconds, you cannot close this yet',
                      autoClose: false,
                      withCloseButton: false,
                    });

                    setTimeout(() => {
                      notifications.update({
                        id: 'load-data',
                        color: 'teal',
                        title: 'Data was loaded',
                        message:
                          'Notification will close in 1 seconds, you can close this notification now',
                        icon: <IconCheck size="1rem" />,
                        autoClose: 1000,
                      });
                    }, 1500);
                  }}>
                  Show update notification
                </Button>
              </Group>
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
              <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
              <div className="buttons">
                <button onClick={(e) => addUser(e)}>Создать</button>
                <button onClick={(e) => getAllUsers(e)}>Получать</button>
              </div>
            </form>
          </div>
        </Flex>

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
