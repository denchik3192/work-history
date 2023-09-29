import React, { useEffect, useState } from "react";
import { TableReviews } from "../components/Table/TableReviews";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "../mutations/user";
import { GET_ALL_USER, GET_ONE_USER } from "../query/user";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Container, Title } from "@mantine/core";

type User = {
  id: number;
  username: String;
  age: String;
};

type M = React.MouseEvent<HTMLBodyElement> & {
  path: Node[];
};

const Table: React.FC = () => {
  // const { data, loading, error, refetch } = useQuery(GET_ALL_USER);
  // const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
  //   variables: {
  //     id: 2,
  //   },
  // });

  const history = useSelector((state: RootState) => state.history);

  // console.log(oneUser);

  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("0");

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
      setUsername("");
      setAge("0");
    });
  };
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
  return (
    <Container>
      <TableReviews data={history} />
    </Container>
  );
};

export default Table;
