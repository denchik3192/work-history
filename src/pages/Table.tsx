import React, { useEffect, useState } from 'react';
import { TableReviews } from '../components/Table/TableReviews';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from '../mutations/user';
import { GET_ALL_USER, GET_ONE_USER } from '../query/user';

type User = {
  id: number;
  username: String;
  age: String;
};

type M = React.MouseEvent<HTMLBodyElement> & {
  path: Node[];
};

const Table: React.FC = () => {
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

  return <TableReviews data={users} />;
};

export default Table;
